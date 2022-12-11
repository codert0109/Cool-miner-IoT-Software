import React, { useEffect, useState } from 'react';
import { createStyles, Button, Progress } from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import { Refresh } from 'tabler-icons-react';
import WhiteLabel from '../WhiteLabel';
import classjoin from 'classnames';
import Box from '../Container/Box';
import { classToClassFromExist } from 'class-transformer';
import $ from "axios";
import { useStore } from '@/store/index';
import Router, { useRouter } from 'next/router';
import { publicConfig } from "../../config/public";
const { BACKEND_URL } = publicConfig;

import { Loader } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    secondMargin: {
        marginTop: '10px'
    },
    box: {
        minWidth: '190px'
    },
    header : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
    },
    refresh : {
        position : 'absolute',
        top : 6,
        right : 6,
        cursor : 'pointer',
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center'
    },
    button: {
        position: 'relative',
        transition: 'background-color 150ms ease',
        height: '28px',
        minWidth: '100px',
        maxWidth: '100%'
        // backgroundColor: '#0887BF',
    },

    progress: {
        position: 'absolute',
        bottom: -1,
        right: -1,
        left: -1,
        top: -1,
        height: 'auto',
        backgroundColor: 'transparent',
        zIndex: 0,
    },

    label: {
        position: 'relative',
        zIndex: 1,
    },

    resizeme: {
        margin: '0',
        padding: '0',
        paddingTop: '5px',
        // height: '75px',
        width: '100%',
        // backgroundColor: 'lightblue',
        overflow: 'hidden'
    },

    textItem: {
        cursor: 'pointer'
    }
}));

export default function ({ label }) {
    const INTERVAL_TIME = 1000 * 60 * 5; // every 5 minute, it will

    const { god } = useStore();

    const { classes, theme } = useStyles();
    const [selectedItem, setSelectedItem] = useState('day');

    const [timerID, setTimerID] = useState(null);
    const [uptime, setUpTime] = useState('0');

    const [isloading, setLoading] = useState(true);

    const updateTime = () => {
        setLoading(true);
        $.post(`${BACKEND_URL}/api/device_uptime/getUpTime`,
            { address: god.currentNetwork.account }).then(function (data: any) {
                setLoading(false);
                let info = data.data;
                if (info.status === 'OK') {
                    let timeInfo = "";
                    let timeunit = ['s', 'm', 'h'];
                    let cur = info.uptime;
                    for (let i = 0; i < 2; i++) {
                        let head = ~~(cur / 60);

                        timeInfo = `${cur % 60}${timeunit[i]}${i == 0 ? '' : ' '}${timeInfo}`;
                        cur = head;
                        if (cur == 0) break;
                    }
                    if (cur > 0) {
                        timeInfo = `${cur}h ${timeInfo}`;
                    }
                    setUpTime(timeInfo);
                }
            }).catch(function(err) {
                setLoading(false);
            });
    };
    
    useEffect(() => {
        let timerID = setInterval(() => {
            updateTime();
        }, INTERVAL_TIME);

        setTimerID(timerID);
        updateTime();
        Router.events.on('routeChangeComplete', () => {
            updateTime();
        });

        return () => {
            clearInterval(timerID);
        };
    }, []);

    const renderText = (x, y, fontsize, caption, itemvalue) => {
        if (itemvalue !== selectedItem) {
            if (theme.colorScheme == 'dark')
                return <text x={x} y={y} fontSize={fontsize} fill="#C7C7C7" onClick={() => setSelectedItem(itemvalue)} className={classes.textItem}>{caption}</text>;
            return <text x={x} y={y} fontSize={fontsize} fill="#000000" onClick={() => setSelectedItem(itemvalue)} className={classes.textItem}>{caption}</text>;
        }
        return <text x={x} y={y} fontSize={fontsize} fill="#00ff11" onClick={() => setSelectedItem(itemvalue)} className={classes.textItem}>{caption}</text>;
    };

    const renderContent = () => {
        if (isloading === true) {
            return (
                <div className={classes.header}>
                    <Loader size="xs"/>
                    <span>&nbsp;&nbsp;{label}</span>
                </div>
            );
        }
        return (
            <div>{label}</div>
        )
    };

    const renderHeader = () => {
        return (
            <>
                {renderContent()}
                <div className={classes.refresh} onClick={updateTime}>
                    <Refresh size="19"/>
                    <span>Refresh</span>
                </div>
            </>
        );
    };

    return (
        <Box label={renderHeader()}>
            <WhiteLabel label="Accumulated Uptime" className="" />
            <WhiteLabel label={`${uptime}`} className={classes.secondMargin} />
            {/* <div className={classes.resizeme}>
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 500 70"
                    preserveAspectRatio="xMinYMid meet"
                    // style={{backgroundColor:"green"}}
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    style={{cursor : 'context-menu'}}
                >
                    {renderText(80, 60, 38, 'Day', 'day')}
                    <text x="160"    y="60" fontSize="38" fill={theme.colorScheme == 'dark' ? "white" : "black"} > | </text>
                    {renderText(178, 60, 38, 'Week', 'week')}
                    <text x="290"   y="60" fontSize="38" fill={theme.colorScheme == 'dark' ? "white" : "black"} > | </text>
                    {renderText(309, 60, 38, 'Month', 'month')}
                </svg>
            </div> */}
        </Box>
    );
}