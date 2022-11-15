import React, { useEffect, useState } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import { Box, Button, createStyles } from '@mantine/core';
import { useStore } from '@/store/index';
import { publicConfig } from '../../config/public';
import HistoricalReward from '../HistoricalReward';

const { BACKEND_URL } = publicConfig;

const useStyles = createStyles((theme) => ({}));

export default observer((props: Props) => {
  const { classes } = useStyles();
  const { god, auth } = useStore();

  const [epochInfo, setEpochInfo] = useState<any>([]);

  useEffect(() => {
    auth
      .$()
      .post(`${BACKEND_URL}/api/device_uptime/getUpTimeInfo`, {
        // address: '0xb2Eff630C86A1cBBC560a31c974c20758b717208'
        address: god.currentNetwork.account
      })
      .then((response: any) => {
        let data: any = response.data;
        let info: any = data.data;

        let obj: any = {};

        info.forEach((item) => {
          if (obj[item.nft_id] == null) {
            obj[item.nft_id] = {};
            obj[item.nft_id].list = [];
            obj[item.nft_id].history = [];
          }
          obj[item.nft_id].list.push(item);
        });

        data.rewardHistory.data.forEach((item) => {
          item.forEach((subitem) => {
            if (obj[subitem.nft_id] == undefined) return;
            obj[subitem.nft_id].history.push(parseInt(subitem.reward_info) / Math.pow(10, data.rewardHistory.precision));
          });
        });

        setEpochInfo(
          Object.keys(obj).map((key) => {
            return {
              nft_id: key,
              info: obj[key].list.sort((a, b) => b.epoch - a.epoch),
              history: obj[key].history
            };
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, [god.currentNetwork.account]);

  return (
    <>
      {epochInfo.map((item) => {
        return <HistoricalReward nft_id={item.nft_id} info={item.info} history={item.history} />;
      })}
    </>
  );
});

interface Props {}
