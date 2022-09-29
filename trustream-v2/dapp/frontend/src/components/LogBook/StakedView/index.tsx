import React, { useEffect, useState } from 'react';
import { createStyles, Table, Button, Progress, Anchor, Text, Group, ScrollArea, Box, ListItem } from '@mantine/core';
import WhiteLabel from "@/components/WhiteLabel";
import { useLocalObservable, observer } from 'mobx-react-lite';
import { useStore } from '@/store/index';
import StakeNode from './StakeNode';

const useStyles = createStyles((theme) => ({
  progressBar: {
    '&:not(:first-of-type)': {
      borderLeft: `3px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
    },
  }
}));

interface TableReviewsProps {
  data: {
    Date: string,
    Amount: number,
    Miners: number,
    Level: string,
    Multiplier: string,
    TimeRemaining: number,
    TotalTime: number
  }[];
}

interface STAKE_INFO {
  type_id: number,
  startTime: number,
  expireTime: number,
  amount: number
}

interface Props { }

export default observer((props: Props) => {
  const { god, stake } = useStore();

  const [stakeInfo, setStakeInfo] = useState<STAKE_INFO>({
    type_id: 0,
    startTime: 0,
    expireTime: 0,
    amount: 0
  });

  const refresh = async () => {
    let value: any = await stake.getStakingInfo();

    if (value == null || value.amount == 0) {
      setStakeInfo({
        type_id: 0,
        startTime: 0,
        expireTime: 0,
        amount: 0
      });
    } else {
      setStakeInfo({
        type_id: parseInt(value.type_id.toString()),
        startTime: parseInt(value.startTime.toString()),
        expireTime: parseInt(value.expireTime.toString()),
        amount: parseInt(value.amount.toString())
      });
    }
  };

  useEffect(() => {
    refresh();
  }, [god.currentNetwork.account]);

  const renderBody = () => {
    if (stakeInfo.amount == 0) {
      return (
        <tr>
          <td colSpan={7}>
            There is no staking
          </td>
        </tr>
      );
    }

    return <StakeNode
      key={0}
      startTime={stakeInfo.startTime}
      expireTime={stakeInfo.expireTime}
      amount={stakeInfo.amount} />
  };

  const tableView = () => {
    return (
      <ScrollArea style={{ width: '100%' }}>
        <Table sx={{ minWidth: 600, maxWidth: '100%', color: 'black' }} verticalSpacing="xs">
          <thead>
            <tr>
              <th style={{ color: 'black' }} >Date</th>
              <th style={{ color: 'black', textAlign: 'center' }} >Staked Amount</th>
              <th style={{ color: 'black' }} >Staking Period</th>
              <th style={{ color: 'black' }} >Active Miner(s)</th>
              <th style={{ color: 'black' }} >Current Multiplier</th>
              <th style={{ color: 'black' }} >Level</th>
              <th style={{ color: 'black' }} >Edit</th>
            </tr>
          </thead>
          <tbody>
            {renderBody()}
          </tbody>
        </Table>
      </ScrollArea>
    );
  };

  return (
    <WhiteLabel label={tableView()} className='' />
  );
});