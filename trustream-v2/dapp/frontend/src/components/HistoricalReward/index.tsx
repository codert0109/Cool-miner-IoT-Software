import React, { useEffect, useState } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import Box from "@/components/Container/Box";
import { Button, createStyles } from '@mantine/core';
import classnames from 'classnames';
import { formatDecimalWeb3, formatUpTime } from '@/utils/index';
import { useStore } from '@/store/index';
import { publicConfig } from "../../config/public";

const { BACKEND_URL } = publicConfig;

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

    centerAlign: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '36px'
    },

    imgStyle: {
        height: 30,
        transform: 'translate(0px, 2px)'
    },

    minerName: {
        position: 'absolute',
        top: 3,
        paddingRight: 5,
        backgroundColor: 'black',
        left: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));


export default observer((props: Props) => {
    const { auth } = useStore();
    const { classes } = useStyles();

    const [name, setName] = useState('');

    useEffect(() => {
        const process = async () => {
            let data = await auth.$().post(`${BACKEND_URL}/api/nft_auth/status`, {
                nft_id: props.nft_id
            });
            console.log('nft_info', data);
            let info = data.data.data;
            setName((info.miner ? info.miner : 'Not set') + '(' + info.nft_id + ')');
        };
        process();
    }, [props.nft_id]);

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
                    {name}
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
                        {/* <th className={classes.th} key="4">Total Uptime</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        props.info.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className={classnames(classes.center, classes.green)} key="1">{formatUpTime(item.epoch)}</td>
                                    <td className={classes.center} key="2">{item.uptime / 60} Minutes</td>
                                    <td className={classes.center} key="3">X {item.multiplier / 10000}</td>
                                    <td className={classes.center} key="4">{item.reward == null ? 0 : formatDecimalWeb3(BigInt(item.reward))} ELUM</td>
                                    {/* <td className={classes.center} key="5">10800 minutes</td> */}
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </Box>
    );
});

interface Props {
    nft_id: number;
    info: any;
}