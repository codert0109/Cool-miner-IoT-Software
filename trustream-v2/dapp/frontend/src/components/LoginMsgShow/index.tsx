import { useStore } from '@/store/index';
import { createStyles, useMantineTheme } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const global = require('../../global.js');

const useStyles = createStyles((theme) => ({
    portalDiv: {
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        width: 400,
        fontSize: '1em',
        background: 'white',
        color: 'black',
        borderRadius: 10,
        padding: 10,
        paddingTop: 0
    },
    greenText: {
        color: 'green',
        fontSize: '1em'
    },
    infoText: {
        fontSize: '.5em',
        fontStyle: 'italic'
    },

    imgdiv: {
        flexGrow: 1,
        cursor: 'pointer'
    },
    imgstyle: {
        height: '17px'
    },
    imgmetamaskstyle: {
        height: 50,
        margin: 10
    },
    btncolor: {
        backgroundColor: 'rgb(75, 141, 255)',
        color: 'white',
        cursor: 'pointer',
        borderRadius: 10,
        fontSize: '.5em',
        width: '45%',
        marginLeft: 'auto !important',
        marginRight: 'auto !important',
    },
    connectbtn: {
        cursor: 'pointer'
    }
}));

export default function ({ className }) {
    const theme = useMantineTheme();
    const router = useRouter();
    const { classes } = useStyles();
    const { god } = useStore();

    const [errorShowed, setErorShowed] = useState(false);
    
    useEffect(() => {
        axios.get(`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`)
            .then((data) => {
                // no problem, still go
            })
            .catch((err) => {
                const check = async () => {
                    console.log('working');
                    let isBrave = await global.isBrave();
                    if (isBrave == true) {
                        if (errorShowed == true)
                            return;
                        Swal.fire(
                            'Warning',
                            `<p>Our system has detected you are currently using Brave Web Browser.</p>
                             <p>You will need to turn Brave Shields Down or open miner.elumicate.com with a different browser.</p>`,
                            'warning'
                        );
                        setErorShowed(true);
                    }
                };
        
                check();
            });
    }, []);

    return (
        <div className={className}>
            <div className={classes.portalDiv}>
                <div className={classes.imgdiv} onClick={() => router.push('https://www.elumicate.com/')}>
                    {theme.colorScheme === 'dark' && <img className={classes.imgstyle} src="/images/logo/Elumicate-font-viga-black-logo-SMALL.png"></img>}
                    {theme.colorScheme !== 'dark' && <img className={classes.imgstyle} src="/images/logo/Elumicate-font-viga-white-logo-SMALL.png"></img>}
                </div>

                <div>Welcome to the</div>
                <div style={{ marginTop: - 15 }}>Elumicate Mining Portal</div>
                <div className={classes.greenText}>Ready to start Mining?</div>
                <div style={{ height: 10 }}></div>
                <div className={classes.infoText}>
                    <div>In order to view the portal you must have</div>
                    <div>a Metamask Wallet installed and</div>
                    <div>connected to the IoTex testnet.</div>
                    <div className={classes.connectbtn} onClick={() => god.setShowConnecter(true)}>
                        <img className={classes.imgmetamaskstyle} src="/images/logo/metamask.png"></img>
                    </div>
                    <div>You can find full details on how to get</div>
                    <div>started here.</div>
                </div>
                <div
                    className={classes.btncolor}
                    onClick={() => {
                        router.push('https://whitepaper.elumicate.com/user-experience/testnet-onboarding')
                    }}>
                    Open Whitepaper
                </div>
            </div>
        </div>
    )
};