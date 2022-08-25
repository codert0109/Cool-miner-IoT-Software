import React, { useEffect, useState } from 'react';
import { createStyles, Button, Progress } from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import { BorderStyle } from 'tabler-icons-react';
import WhiteLabel from '../WhiteLabel';
import classjoin from 'classnames';
import Box from '../Container/Box';
import { classToClassFromExist } from 'class-transformer';
import $ from "axios";
import { useStore } from '@/store/index';

const useStyles = createStyles((theme) => ({
    secondMargin: {
        marginTop: '10px'
    },
    box: {
        minWidth: '190px'
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
    const INTERVAL_TIME = 5000;

    const { god } = useStore();

    const { classes, theme } = useStyles();
    const [selectedItem, setSelectedItem] = useState('day');

    const [timerID, setTimerID] = useState(null);
    const [uptime, setUpTime] = useState('0');

    useEffect(() => {
        const updateTime = () => {
            $.post('https://miner.elumicate.com/api/device_uptime/getUpTime',
                { address: god.currentNetwork.account }).then(function (data: any) {
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
                });
        };
        let timerID = setInterval(() => {
            updateTime();
        }, INTERVAL_TIME);

        setTimerID(timerID);
        updateTime();

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

    return (
        <Box label={label}>
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