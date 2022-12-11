import Box from "../Container/Box";
import { createStyles } from "@mantine/core";
import { useEffect, useState } from "react";
import WhiteLabel from "../WhiteLabel";
import $ from "axios";
import Router, { useRouter } from 'next/router';
import { Loader } from '@mantine/core';
import { Refresh } from 'tabler-icons-react';
import { publicConfig } from "../../config/public";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store/index";
const { BACKEND_URL } = publicConfig;

const useStyles = createStyles((theme) => ({
    centerAlign : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        height : '36px'
    },

    headerClass : {
        backgroundColor : theme.colorScheme == 'dark' ? 'rgb(32, 45, 66) !important' : 'rgb(32, 45, 66)'
    },

    bodyClass : {
        backgroundColor : theme.colorScheme == 'dark' ? 'rgb(72, 72, 72) !important' : 'rgb(32, 45, 66)'
    },

    imgStyle : {
        height : '60%'
    },

    w100 : {
        width : '100%',
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center'
    },

    refresh : {
        position : 'absolute',
        top : 9,
        right : 9,
        cursor : 'pointer',
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center'
    },

    expand : {
        width : 0
    },

    split : {
        marginBottom : 3,
        marginTop : 1
    }
}));

export default observer(() => {
    const INTERVAL_TIME = 1000 * 60 * 5; // every 5 minute, it will update

    const { god, auth, nft } = useStore();

    const { classes } = useStyles();

    const [minerStatus, setMinerStatus] = useState([]);

    const [isloading, setLoading] = useState(true);
    const [timerID, setTimerID] = useState(null);

    useEffect(() => {
        nft.refresh();
        updateStatus();
    }, [god.currentNetwork.account]);

    const updateStatus = () => {
        setLoading(true);
        nft.getNFTLists()
            .then(async (data) => {
                let info: any = data;
                let curNFTStatus = [];

                for (let i = 0; i < info.length; i++) {
                    let item = info[i].toString();
                    try {
                        let data = await auth.$().post(`${BACKEND_URL}/api/nft_auth/status`, {
                            nft_id: item
                        });
                        let info = data.data.data;
                        curNFTStatus.push({
                            name: item,
                            session : info.session,
                            working: info.active,
                        });
                    } catch (err) {
                        curNFTStatus.push({
                            name: item,
                            session : info.session,
                            working: false,
                        });
                    }
                }

                setMinerStatus(curNFTStatus);
                setLoading(false);
            })
            .catch((err) => {
                setMinerStatus([]);
                setLoading(false);
            });
    };

    useEffect(() => {
        let timerID = setInterval(() => {
            updateStatus();
        }, INTERVAL_TIME);

        setTimerID(timerID);

        updateStatus();

        Router.events.on('routeChangeComplete', () => {
            updateStatus();
        });

        return () => {
            clearInterval(timerID);
        };
    }, []);

    const renderLabel = () => {
        return (
            <div className={classes.centerAlign}>
                {
                    isloading &&
                    <>
                        <Loader size="xs"/>
                        &nbsp;&nbsp;
                    </>
                }
                <span>My Miners</span>
            </div>
        )
    };

    const onRefresh = () => {
        updateStatus();
    };

    const renderHeader = () => {
        return (
            <>
                {renderLabel()}
                <div className={classes.refresh} onClick={onRefresh}>
                    <img src="/images/status/refresh.svg" height="17"/>
                </div>
            </>
        );
    };

    const renderElement = (item) => {
        const renderBody = () => {
            return (
                <div className={classes.w100}>
                    <div className={classes.expand} style={{ flexGrow : '1' }}>
                        {item.name}
                    </div>
                    <div>
                        {item.working === true && <img src="/images/status/working.png" className={classes.imgStyle}></img>}
                        {item.working === false && item.session == null && <img src="/images/status/stopped.png" className={classes.imgStyle}></img>}
                        {item.working === false && item.session != null && <img src="/images/status/warning.png" className={classes.imgStyle}></img>}
                    </div>
                </div>
            );
        };

        return (
            <WhiteLabel label={renderBody()} className={classes.split} />
        )
    };

    return (
        <Box label={renderHeader()} headerClass={classes.headerClass} bodyClass={classes.bodyClass}>
            {
                minerStatus.map(item => renderElement(item))
            }
        </Box>
    );
});