import { FloatingLabelInput } from "@/components/FloatingLabelInput";
import { useEffect, useState } from "react";
import { Button, List, Loader, Textarea, createStyles } from '@mantine/core';
import Swal from "sweetalert2";
import { useStore } from '../../../store/index';
import $ from 'axios';
import { publicConfig } from "../../../config/public";
const { BACKEND_URL } = publicConfig;

const useStyles = createStyles((theme) => ({
    split: {
        paddingBottom: 10,
        paddingTop: 10
    },
    gridDivBtn: {
        marginTop: '16px',
        float: 'right'
    },
    loader: {
        marginRight: '10px'
    },
    releaseStyle: {
        fontSize: '0.8em'
    }
}));

export default function () {
    const { classes } = useStyles();

    const { god, auth } = useStore();
    const [pending, isPending] = useState(false);
    const [loading, isLoading] = useState(true);

    const [version, setVersion] = useState('Not set');
    const [download, setDownload] = useState('Not set');
    const [message, setMessage] = useState('Not set');
    const [note,    setNote] = useState('Not set');

    const [dbData, setDBData] = useState({
        version : 'Not set',
        download : 'Not set',
        message : 'Not set',
        note : 'Not set'
    });

    const [requireversion, setRequireVersion] = useState('Not set');
    const [dbversion, setDBVersion] = useState('Not set');

    useEffect(() => {
        // need to update
        auth.$().get(`${BACKEND_URL}/api/status/getRequiredVersion`)
            .then((data : any) => {
                let info: any = data.data;
                if (info.status == 'OK') {
                    if (info.message.version.value == null) {
                        setRequireVersion('1.0.0');
                        setDBVersion('1.0.0');                        
                    } else {
                        setRequireVersion(info.message.version.value);
                        setDBVersion(info.message.version.value);
                    }
                } else {
                    Swal.fire({
                        title: 'Error',
                        html: `<p>Loading Error</p>`,
                        icon: 'error',
                    });
                    setRequireVersion('error');
                    setDBVersion('error');
                }
            })
            .catch((err) => {
                Swal.fire({
                    title: 'Error',
                    html: `<p>Loading Error</p>`,
                    icon: 'error',
                });
                setRequireVersion('error');
                setDBVersion('error');
            });

        isLoading(true);
        auth.$().get(`${BACKEND_URL}/update`)
            .then((data: any) => {
                isLoading(false);
                let info: any = data.data;
                if (info.status == 'OK') {
                    setVersion(info.version);
                    setDownload(info.download);
                    setMessage(info.message);
                    setNote(info.note);

                    setDBData({
                        version : info.version,
                        download : info.download,
                        message : info.message,
                        note : info.note
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        html: `<p>Loading Error</p>`,
                        icon: 'error',
                    });
                }
            })
            .catch((err) => {
                isLoading(false);
                Swal.fire({
                    title: 'Error',
                    html: `<p>Loading Error</p>`,
                    icon: 'error',
                });
            });
    }, []);

    const onUpdate = () => {
        isPending(true);
        const performAction = () => {
            let updated = false;
            if (dbversion != requireversion) {      // reduce unnecessary calls
                updated = true;
                auth.$().post(`${BACKEND_URL}/api/status/setRequiredVersion`, { version : requireversion })
                    .then((data : any) => {
                        let info : any = data.data;
                        if (info.status == 'OK') {
                            Swal.fire({
                                title: 'Success',
                                html: `<p>Updating Success</p>`,
                                icon: 'success',
                            });
                            setDBVersion(requireversion);
                        } else {
                            Swal.fire({
                                title: 'Info',
                                html: `<p>${info.message}</p>`,
                                icon: 'info',
                            });
                        }
                    })
                    .catch((err) => {
                        Swal.fire({
                            title: 'Error',
                            html: `<p>Errors Occured.</p>`,
                            icon: 'error',
                        });
                    })
                    .finally(() => {
                        isPending(false);
                    });
            }

            const onEditedVersion = () => {
                if (dbData.version !== version)     return true;
                if (dbData.download !== download)   return true;
                if (dbData.message !== message)     return true;
                if (dbData.note !== note)           return true;
                return false;
            };

            if (onEditedVersion()) {
                updated = true;
                auth.$().post(`${BACKEND_URL}/update/create`, { version, download, message, note })
                    .then((data: any) => {
                        let info: any = data.data;
                        if (info.status == 'OK') {
                            Swal.fire({
                                title: 'Success',
                                html: `<p>Updating Success</p>`,
                                icon: 'success',
                            });
                            setDBData({
                                version,
                                download,
                                message,
                                note
                            })
                        } else {
                            Swal.fire({
                                title: 'Info',
                                html: `<p>${info.message}</p>`,
                                icon: 'info',
                            });
                        }
                        isPending(false);
                    })
                    .catch((err) => {
                        Swal.fire({
                            title: 'Error',
                            html: `<p>Errors Occured.</p>`,
                            icon: 'error',
                        });
                        isPending(false);
                    });
            }

            if (updated == false) {
                isPending(false);
                Swal.fire({
                    title: 'Info',
                    html: `<p>Nothing to Update.</p>`,
                    icon: 'info',
                });
            }
        };

        Swal.fire({
            title: 'Warning',
            html: `<p>Are you sure?</p>`,
            icon: 'warning',
            showCancelButton: true,
        }).then((result) => {
            if (!result.isConfirmed) {
                isPending(false);
                return;
            }
            auth.check_auth(
                () => {
                    performAction();
                },
                () => {
                    Swal.fire({
                        title: 'Error',
                        html: `<p>You need to login to use admin functions.</p>`,
                        icon: 'error',
                        showCancelButton: true
                    }).then((result) => {
                        if (!result.isConfirmed) {
                            isPending(false);
                            return;
                        }
                        auth.login(
                            () => {
                                performAction();
                            },
                            () => {
                                Swal.fire({
                                    title: 'Error',
                                    html: `<p>Errors Occured while login.</p>`,
                                    icon: 'error',
                                });
                                isPending(false);
                            });
                    }).catch(() => {
                        Swal.fire({
                            title: 'Info',
                            html: `<p>Updating has been cancelled.</p>`,
                            icon: 'info',
                        });
                        isPending(false);
                    });
                });
        }).catch((err) => {
            Swal.fire({
                title: 'Error',
                html: `<p>Errors Occured.</p>`,
                icon: 'error',
            });
            isPending(false);
        });
    };

    if (loading) {
        return (
            <div>
                <Loader size="xs" className={classes.loader} />
            </div>
        )
    }

    return (
        <div>
            <div className={classes.split}>
                <FloatingLabelInput
                    onChange={setVersion}
                    label="Current Version"
                    initvalue={version}
                    placeholder="Input new version." />
            </div>
            <div className={classes.split}>
                <FloatingLabelInput
                    onChange={setDownload}
                    label="Download URL"
                    initvalue={download}
                    placeholder="Input new download URL." />
            </div>
            <div className={classes.split}>
                <FloatingLabelInput
                    onChange={setMessage}
                    label="Message"
                    initvalue={message}
                    placeholder="Input Messages" />
            </div>
            <div className={classes.split}>
                <Textarea 
                    size="xs"
                    value={note}
                    onChange={(event) => setNote(event.currentTarget.value)}
                    placeholder="Add Release Notes here."
                    label="Release Notes"
                    autosize
                    minRows={2}
                />
            </div>
            
            <div className={classes.split}>
                <FloatingLabelInput
                    onChange={setRequireVersion}
                    label="Required Version"
                    initvalue={requireversion}
                    placeholder="Input Messages" />
            </div>

            <Button disabled={pending} className={classes.gridDivBtn} onClick={onUpdate}>
                {pending && <Loader size="xs" className={classes.loader} />}
                Update
            </Button>
        </div>
    )
}