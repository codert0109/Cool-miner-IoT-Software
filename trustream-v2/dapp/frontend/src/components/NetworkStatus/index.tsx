import React, { useEffect, useState } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import Box from "@/components/Container/Box";
import { Button, createStyles } from '@mantine/core';
import classnames from 'classnames';
import { useStore } from '@/store/index';
import { publicConfig } from "../../config/public";
import { formatDecimalWeb3 } from '@/utils/index';

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
  }
}));


export default observer((props: Props) => {
  const { classes } = useStyles();
  const { auth, god } = useStore();

  const [duration, setDuration] = useState(0);
  const [miner, setMiner] = useState(0);
  const [weight, setWeight] = useState(0);
  const [reward, setReward] = useState('0');

  const [rewardInfo, setRewardInfo] = useState([]);

  useEffect(() => {
    auth.$().get(`${BACKEND_URL}/api/epoch/status`)
      .then((response: any) => {
        let data: any = response.data;
        setDuration(data.data.duration);
        setMiner(data.data.miner);
        setWeight(data.data.weight);
        console.log('getInformation', data);
        setReward(formatDecimalWeb3(BigInt(data.data.reward)).toString());
      }).catch((err) => {
        setDuration(0);
        setMiner(0);
        setWeight(0);
        setReward('0');
        console.log('getInformation error', err);
      });
  }, []);

  useEffect(() => {
    auth.$().post(`${BACKEND_URL}/api/device_uptime/getUpTimeInfo`, {
      address: god.currentNetwork.account
    }).then((response: any) => {
      console.log('miner response', response);
    }).catch((err) => {

    });
  }, [god.currentNetwork.account]);

  return (
    <Box label="Overall Network Stats" headerClass={classes.orange}>
      <table className={classes.NFTTable}>
        <thead className={classes.thead}>
          <tr>
            <th className={classes.th} key="1">Epoch Duration</th>
            <th className={classes.th} key="2">Active Miners</th>
            <th className={classes.th} key="3">Accumulated Weight Rating</th>
            <th className={classes.th} key="4">Epoch Rewards</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={classnames(classes.center, classes.green)} key="1">{duration} Seconds</td>
            <td className={classes.center} key="2">{miner}</td>
            <td className={classes.center} key="3">{weight}</td>
            <td className={classes.center} key="4">{reward} ELUM</td>
          </tr>
        </tbody>
      </table>
    </Box>
  );
});

interface Props { }