import React, { useEffect, useState } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import { Box, Button, createStyles } from '@mantine/core';
import { useStore } from '@/store/index';
import { publicConfig } from "../../config/public";
import HistoricalReward from '../HistoricalReward';

const { BACKEND_URL } = publicConfig;

const useStyles = createStyles((theme) => ({

}));

export default observer((props: Props) => {
    const { classes } = useStyles();
    const { god, auth } = useStore();

    const [epochInfo, setEpochInfo] = useState<any>([]);

    useEffect(() => {
        auth.$().post(`${BACKEND_URL}/api/device_uptime/getUpTimeInfo`, {
            address: god.currentNetwork.account
            // address: '0x8b7e9dAb3c280A13A987EC3836f5c01E60326d2D'
        }).then((response: any) => {
            console.log('miner response', response);
            let data : any = response.data;
            let info : any = data.data;

            let obj : any = {};

            info.forEach(item => {
                if (obj[item.nft_id] == null) {
                    obj[item.nft_id] = [];
                }
                obj[item.nft_id].push(item);
            });

            setEpochInfo(Object.keys(obj).map(key => {
                return {
                    nft_id : key,
                    info : obj[key].sort((a, b) => b.epoch - a.epoch)
                };
            }));
        }).catch((err) => {
            console.error(err);
        });
    }, [god.currentNetwork.account]);

    return (
        <>
            {
                epochInfo.map(item => {
                    return <HistoricalReward nft_id={item.nft_id} info={item.info}/>
                })
            }
        </>
    );
});

interface Props { }