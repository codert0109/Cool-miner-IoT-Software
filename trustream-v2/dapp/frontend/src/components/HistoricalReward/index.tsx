import React from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import Box from "@/components/Container/Box";
import { Button, createStyles } from '@mantine/core';
import classnames from 'classnames';

const useStyles = createStyles((theme) => ({
    NFTTable: {
        background: 'white',
        color: 'black',
        width: '100%'
    },

    thead: {
        borderBottom: '1px solid black',
    },

    orange: {
        backgroundColor: 'rgb(255, 102, 0)'
    },

    th: {
        borderBottom: '1px solid black'
    },

    center: {
        textAlign: 'center'
    },

    green: {
        color: 'green'
    },

    centerAlign : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        height : '36px'
    },

    imgStyle : {
        height : 30,
        transform : 'translate(0px, 2px)'
    },

    minerName : {
        position : 'absolute',
        top : 3,
        paddingRight : 5,
        backgroundColor : 'black',
        left : 8,
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center'
    }
}));


export default observer((props: Props) => {
    const { classes } = useStyles();

    const renderLabel = () => {
        return (
            <div className={classes.centerAlign}>
                <span>Historical Rewards</span>
            </div>
        )
    };

    const renderHeader = () => {
        return (
            <>
                {renderLabel()}
                <div className={classes.minerName}>
                    {/* {status === false && <img src="/images/status/stopped.png" className={classes.imgStyle}></img>}
                    {status === true && <img src="/images/status/working.png" className={classes.imgStyle}></img>} */}
                    <img src="/images/status/working.png" className={classes.imgStyle}></img>
                    CobraKai
                </div>
            </>
        );
    };

    return (
        <Box label={renderHeader()}>
            <table className={classes.NFTTable}>
                <thead className={classes.thead}>
                    <tr>
                        <th className={classes.th} key="1">Epoch Time</th>
                        <th className={classes.th} key="2">Mining Time</th>
                        <th className={classes.th} key="3">Multiplier</th>
                        <th className={classes.th} key="4">Epoch Reward</th>
                        <th className={classes.th} key="4">Total Uptime</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={classnames(classes.center, classes.green)} key="1">10:00 am - 11:00 am</td>
                        <td className={classes.center} key="2">20 minutes</td>
                        <td className={classes.center} key="3">X 1.55</td>
                        <td className={classes.center} key="4">333 ELUM</td>
                        <td className={classes.center} key="4">10800 minutes</td>
                    </tr>
                </tbody>
            </table>
        </Box>
    );
});

interface Props { }