import Box from "../Container/Box";
import { createStyles } from "@mantine/core";
import { useEffect, useState } from "react";
import WhiteLabel from "../WhiteLabel";
import $ from "axios";
import Router, { useRouter } from 'next/router';
import { Loader } from '@mantine/core';
import { Refresh } from 'tabler-icons-react';
import { publicConfig } from "../../config/public";
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
        height : '60%',
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

export default function() {
    const INTERVAL_TIME = 1000 * 60 * 5; // every 5 minute, it will update

    const { nft } = useStore();
    const { classes, theme } = useStyles();

    const [serverStatus, setServerStatus] = useState([
        { name : 'MQTT',        working : true },
        { name : 'W3bstream',   working : true },
        { name : 'Database',    working : true }
    ]);

    const [isloading, setLoading] = useState(true);
    const [timerID, setTimerID] = useState(null);

    const [totMinerCnt, setTotMinerCnt] = useState(0);

    const [totalCars,           setTotalCars]        = useState(0);
    const [totalTrucks,         setTotalTrucks]      = useState(0);
    const [totalPedestrians,    setTotalPedestrians] = useState(0);
    const [totalBuses,          setTotalBuses]       = useState(0);
    const [totalEvents,         setTotalEvents]      = useState(0);

    const updateStatus = () => {
        setLoading(true);

        let keyList = ["TOTAL_CARS","TOTAL_TRUCKS","TOTAL_PEDESTRIANS","TOTAL_BUSES","TOTAL_EVENTS"];

        $.post(`${BACKEND_URL}/api/key_status/setting/getvaluelist`, { keyList })
            .then((data : any) => {
                if (data.data.status != 'OK')
                    return;
                setTotalCars(data.data.message.TOTAL_CARS.value);
                setTotalTrucks(data.data.message.TOTAL_TRUCKS.value);
                setTotalPedestrians(data.data.message.TOTAL_PEDESTRIANS.value);
                setTotalBuses(data.data.message.TOTAL_BUSES.value);
                setTotalEvents(data.data.message.TOTAL_EVENTS.value);
            })
            .catch((err) => {
                return;
            });
        
        nft.callContract('getTotalNFT', [])
            .then((data) => {
                setTotMinerCnt(parseInt(data.toString()));
            })
            .catch((err) => {
                console.error(err);
                setTotMinerCnt(0);
            })

        $.get(`${BACKEND_URL}/api/status/servers`)
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
                <div className={classes.refresh} onClick={onRefresh}>
                    <img src="/images/status/refresh.svg" height="17"/>
                    {/* <span>Refresh</span> */}
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

    const renderMinerCntElement = () => {
        const renderBody = () => {
            return (
                <div className={classes.w100}>
                    <div className={classes.expand} style={{ flexGrow : '1' }}>
                        Total Miners
                    </div>
                    <div style={{width : 32, textAlign : 'center'}}>
                        <span>{totMinerCnt}</span>
                    </div>
                </div>
            );
        };

        return (
            <WhiteLabel label={renderBody()} className={classes.split} />
        )
    };

    const renderEventCntElement = () => {
        let list = [
            { label : 'Total Cars',         value : totalCars }, 
            { label : 'Total Trucks',       value : totalTrucks }, 
            { label : 'Total Pedestrians',  value : totalPedestrians }, 
            { label : 'Total Buses',        value : totalBuses }, 
            { label : 'Total Events',       value : totalEvents }, 
        ];

        const renderBody = ({label, value}) => {
            return (
                <div className={classes.w100}>
                    <div className={classes.expand} style={{ flexGrow : '1' }}>
                        {label}
                    </div>
                    <div style={{textAlign : 'right'}}>
                        <span>{value}</span>
                    </div>
                </div>
            );
        };

        return (
            list.map(item => {
                return (
                    <WhiteLabel label={renderBody(item)} className={classes.split} />
                )
            })

        )
    };

    return (
        <Box label={renderHeader()} headerClass={classes.headerClass} bodyClass={classes.bodyClass}>
            {
                serverStatus.map(item => renderElement(item))
            }
            {
                renderMinerCntElement()
            }
            {
                renderEventCntElement()
            }
        </Box>
    );
}