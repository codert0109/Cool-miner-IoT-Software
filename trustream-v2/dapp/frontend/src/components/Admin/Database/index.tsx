import { Button, Loader, createStyles } from '@mantine/core';
import { useState } from 'react';
import Swal from "sweetalert2";
import { useStore } from '../../../store/index';

const useStyles = createStyles((theme) => ({
    split: {
        paddingBottom: 10,
        paddingTop: 10
    },
    gridDivBtn: {
        marginTop: '16px',
    },
    splithorz : {
        paddingRight : 10
    },
    loader: {
        marginRight: '10px'
    },
    body : {
        display : 'flex',
        alignItems : 'center'
    }
}));

export default function () {
    const { classes } = useStyles();
    const { god, auth } = useStore();

    const [pending, isPending] = useState(false);

    const onClearConflict = () => {
        const performAction = () => {
            auth.$().get('https://miner.elumicate.com/api/device_status/clean')
                .then((data: any) => {
                    let info: any = data.data;
                    if (info.status == 'OK') {
                        Swal.fire({
                            title: 'Success',
                            html: `<p>Cleaning Conflict Success!</p><p>Solved ${info.solved} conflicts!`,
                            icon: 'success',
                        });
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
        };

        isPending(true);
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
                        html: `<p>Clearing Conflict has been cancelled.</p>`,
                        icon: 'info',
                    });
                    isPending(false);
                });
            }
        );
    };


    const [pendingUptime, isPendingUptime] = useState(false);

    const onFixUptime = () => {
        const performAction = () => {
            auth.$().post('https://miner.elumicate.com/api/device_uptime/fixUpTime')
                .then((data: any) => {
                    let info: any = data.data;
                    if (info.status == 'OK') {
                        Swal.fire({
                            title: 'Success',
                            html: `<p>Fixing Uptime Success!</p><p>Solved ${info.solved} conflicts!`,
                            icon: 'success',
                        });
                    } else {
                        Swal.fire({
                            title: 'Info',
                            html: `<p>${info.message}</p>`,
                            icon: 'info',
                        });
                    }
                    isPendingUptime(false);
                })
                .catch((err) => {
                    Swal.fire({
                        title: 'Error',
                        html: `<p>Errors Occured.</p>`,
                        icon: 'error',
                    });
                    isPendingUptime(false);
                });
        };

        isPendingUptime(true);
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
                        isPendingUptime(false);
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
                            isPendingUptime(false);
                        });
                }).catch(() => {
                    Swal.fire({
                        title: 'Info',
                        html: `<p>Fixing Uptime has been cancelled.</p>`,
                        icon: 'info',
                    });
                    isPendingUptime(false);
                });
            }
        );
    };

    return (
        <div className={classes.body}>
            <div className={classes.splithorz}>
                <Button className={classes.gridDivBtn} onClick={onClearConflict}>
                    {pending && <Loader size="xs" className={classes.loader} />}
                    Clear Conflict
                </Button>
            </div>
            <div>
                <Button className={classes.gridDivBtn} onClick={onFixUptime}>
                    {pendingUptime && <Loader size="xs" className={classes.loader} />}
                    Fix Uptime
                </Button>
            </div>
        </div>
    )
}