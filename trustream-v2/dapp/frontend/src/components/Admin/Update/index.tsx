import { FloatingLabelInput } from "@/components/FloatingLabelInput";
import { useState } from "react";
import { Button, Loader, createStyles } from '@mantine/core';
import Swal from "sweetalert2";
import { useStore } from '../../../store/index';
import $ from 'axios';

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
    }
}));

export default function () {
    const { classes } = useStyles();

    const { god, auth } = useStore();
    const [pending, isPending] = useState(false);
    const [version, setVersion] = useState('1.0.0');
    const [download, setDownload] = useState('https://github.com/download1.zip');
    const [message, setMessage] = useState('We launched new project');

    const onUpdate = () => {
        const performAction = () => {
            $.post('https://miner.elumicate.com/update/create', { version, download, message })
                .then((data : any) => {
                    let info : any = data.data;
                    if (info.status == 'OK') {
                        Swal.fire({
                            title: 'Success',
                            html: `<p>Updating Success</p>`,
                            icon: 'success',
                        });
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
                });
        };

        Swal.fire({
            title: 'Warning',
            html: `<p>Are you sure?</p>`,
            icon: 'warning',
            showCancelButton: true,
        }).then((result) => {
            if (!result.isConfirmed)
                return;
            auth.check_auth(
                () => {
                    performAction();
                },
                () => {
                    Swal.fire({
                        title: 'Error',
                        html: `<p>You need to login before setting versions.</p>`,
                        icon: 'error',
                        showCancelButton: true
                    }).then((result) => {
                        if (!result.isConfirmed)
                            return;
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
                            });
                    }).catch(() => {
                        Swal.fire({
                            title: 'Info',
                            html: `<p>Updating has been cancelled.</p>`,
                            icon: 'info',
                        });
                    });
                });
        }).catch((err) => {
            Swal.fire({
                title: 'Error',
                html: `<p>Errors Occured.</p>`,
                icon: 'error',
            });
        });
    };

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
            <Button disabled={pending} className={classes.gridDivBtn} onClick={onUpdate}>
                {pending && <Loader size="xs" className={classes.loader} />}
                Update
            </Button>
        </div>
    )
}