import React, { useState } from 'react';
import { createStyles, Button, Progress } from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import { BorderStyle } from 'tabler-icons-react';
import WhiteLabel from '../WhiteLabel';
import classjoin from 'classnames';
import Box from '../Container/Box';
import { classToClassFromExist } from 'class-transformer';

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
        paddingTop : '5px',
        // height: '75px',
        width: '100%',
        // backgroundColor: 'lightblue',
        overflow: 'hidden'
    },

    textItem : {
        cursor : 'pointer'
    }
}));

export default function ({ label }) {
    const { classes, theme } = useStyles();
    const [selectedItem, setSelectedItem] = useState('day');

    const renderText = (x, y, fontsize, caption, itemvalue) => {
        if (itemvalue !== selectedItem) {
            return <text x={x} y={y} fontSize={fontsize} fill="#C7C7C7" onClick={() => setSelectedItem(itemvalue)} className={classes.textItem}>{caption}</text>;
        }
        return <text x={x} y={y} fontSize={fontsize} fill="#ED1C24" onClick={() => setSelectedItem(itemvalue)} className={classes.textItem}>{caption}</text>;
    };
    return (
        <Box label={label}>
            <WhiteLabel label="Desired Amount" className="" />
            <WhiteLabel label="USD 12.3456789" className={classes.secondMargin} />
            <div className={classes.resizeme}>
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
                    {renderText(0, 60, 38, '1 Day', 'day')}
                    {/* <text x="0"     y="60" font-size="38" fill="white" className={classes.textItem}>1 Day</text> */}
                    <text x="94"    y="60" fontSize="38" fill="white"> | </text>
                    {renderText(108, 60, 38, '1 Week', 'week')}
                    {/* <text x="108"   y="60" font-size="38" fill="white" className={classes.textItem}>1 Week</text> */}
                    <text x="230"   y="60" fontSize="38" fill="white"> | </text>
                    {renderText(239, 60, 38, '1 Month', 'month')}
                    {/* <text x="239"   y="60" font-size="38" fill="white" className={classes.textItem}>1 Month</text> */}
                    <text x="378"   y="60" fontSize="38" fill="white"> | </text>
                    {renderText(390, 60, 38, '1 Year', 'year')}
                    {/* <text x="390"   y="60" font-size="38" fill="white" className={classes.textItem}>1 Year</text> */}
                </svg>
            </div>
        </Box>
    );
}