import Box from "../Container/Box";
import { createStyles } from "@mantine/core";
import { useEffect, useState } from "react";
import WhiteLabel from "../WhiteLabel";
import $ from "axios";
import Router, { useRouter } from 'next/router';
import { Loader } from '@mantine/core';
import { Refresh } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
    centerAlign : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        height : '36px'
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
        top : 6,
        right : 4,
        cursor : 'pointer'
    },

    expand : {
        width : 0
    },

    split : {
        marginBottom : 3,
        marginTop : 1
    }
}));

export default function() {
    const INTERVAL_TIME = 60000;

    const { classes, theme } = useStyles();

    const [serverStatus, setServerStatus] = useState([
        { name : 'MQTT',        working : true },
        { name : 'W3bstream',   working : true },
        { name : 'Database',    working : true }
    ]);

    const [isloading, setLoading] = useState(true);
    const [timerID, setTimerID] = useState(null);

    const updateStatus = () => {
        setLoading(true);
        $.get('https://miner.elumicate.com/api/status/servers')
            .then(function (data : any) {
                setLoading(false);
                let info : any = data.data;
                setServerStatus(info);
            })
            .catch(function (err) {
                setLoading(false);
                setServerStatus(
                    [
                        { name : 'MQTT',        working : false },
                        { name : 'W3bstream',   working : false },
                        { name : 'Database',    working : false }
                    ]
                );
            });

    };

    useEffect(() => {
        // let timerID = setInterval(() => {
        //     updateStatus();
        // }, INTERVAL_TIME);

        // setTimerID(timerID);

        updateStatus();
        Router.events.on('routeChangeComplete', () => {
            updateStatus();
        });

        // return () => {
        //     clearInterval(timerID);
        // };
    }, []);

    const renderLabel = () => {
        let status = true;
        for (let item of serverStatus) {
            status = status && item.working;
        }

        return (
            <div className={classes.centerAlign}>
                {
                    isloading &&
                    <>
                        <Loader size="xs"/>
                        &nbsp;&nbsp;
                    </>
                }
                {status === false && <img src="/images/status/stopped.png" className={classes.imgStyle}></img>}
                {status === true && <img src="/images/status/working.png" className={classes.imgStyle}></img>}
                <span>Server Status</span>
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
                <Refresh className={classes.refresh} onClick={onRefresh}/>
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
                        {item.working === false && <img src="/images/status/stopped.png" className={classes.imgStyle}></img>}
                        {item.working === true && <img src="/images/status/working.png" className={classes.imgStyle}></img>}
                    </div>
                </div>
            );
        };

        return (
            <WhiteLabel label={renderBody()} className={classes.split} />
        )
    };
    return (
        <Box label={renderHeader()}>
            {
                serverStatus.map(item => renderElement(item))
            }
        </Box>
    );
}