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

  const [claim_percent, setClaimPercent] = useState('0');

  const [update_handler, setUpdateHandler] = useState(null);

  const isComplete = () => {
    return Math.abs(parseFloat(claim_percent) - 100.0) < 1e-8;
  };

  const UPDATE_INTERVAL = 1000;

  const clearUpdateHandler = () => {
    if (update_handler != null) {
      clearInterval(update_handler);
      setUpdateHandler(update_handler);
    }
  };

  const createUpdateHandler = () => {
    if (update_handler != null) {
      clearInterval(update_handler);
    }
    setUpdateHandler(setInterval(() => {
      console.log('update handler called');
      auth.$().post(`${BACKEND_URL}/api/key_status/setting/get`, { key: 'CLAIM_SERVICE_STATUS' })
        .then((response: any) => {
          let data: any = response.data;
          if (data.message == null) {
            setClaimPercent('0.000');
          } else {
            setClaimPercent(data.message.value)
          }
        })
        .catch((err) => {
          setClaimPercent('100.000');
        });
    }, UPDATE_INTERVAL));
  };

  useEffect(() => {
    if (isComplete() == false) {
      createUpdateHandler();
    } else {
      if (update_handler != null) {
        auth.$().get(`${BACKEND_URL}/api/epoch/status`)
          .then((response1: any) => {
            let data: any = response1.data;
            setDuration(data.data.duration);
            setMiner(data.data.miner);
            setWeight(data.data.weight);
            setReward(formatDecimalWeb3(BigInt(data.data.reward)).toString());
          })
          .catch((err) => {
            setDuration(0);
            setMiner(0);
            setWeight(0);
            setReward('0');
          });
      }
      clearUpdateHandler();
    }

    return () => {
      clearUpdateHandler();
    }
  }, [claim_percent]);

  useEffect(() => {
    let promiseList = [];

    promiseList.push(auth.$().get(`${BACKEND_URL}/api/epoch/status`));
    promiseList.push(auth.$().post(`${BACKEND_URL}/api/key_status/setting/get`, { key: 'CLAIM_SERVICE_STATUS' }));

    Promise.all(promiseList)
      .then((values: any) => {
        console.log('promise values', values);
        let response1 = values[0];
        let response2 = values[1];

        let data: any = response1.data;
        setDuration(data.data.duration);
        setMiner(data.data.miner);
        setWeight(data.data.weight);
        console.log('getInformation', data);
        setReward(formatDecimalWeb3(BigInt(data.data.reward)).toString());

        let data2: any = response2.data;
        if (data2.message == null) {
          setClaimPercent('0.000');
        } else {
          setClaimPercent(data2.message.value)
        }
      })
      .catch((err: any) => {
        setDuration(0);
        setMiner(0);
        setWeight(0);
        setReward('0');
        setClaimPercent('100.000');
        console.log('getInformation error', err);
      });
  }, []);

  return (
    <Box label="Overall Network Stats During last Epoch" headerClass={classes.orange}>
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
          {isComplete() && <tr>
            <td className={classnames(classes.center, classes.green)} key="1">{duration / 60} Minutes</td>
            <td className={classes.center} key="2">{miner}</td>
            <td className={classes.center} key="3">{Math.round(weight / 3600 * 100) / 100}</td>
            <td className={classes.center} key="4">{reward} ELUM</td>
          </tr>}
          {!isComplete() && <tr>
            <td colSpan={4} className={classes.center}>
              Calculation is in progress {parseFloat(claim_percent).toFixed(3)}%
            </td>
          </tr>}
        </tbody>
      </table>
    </Box>
  );
});

interface Props { }