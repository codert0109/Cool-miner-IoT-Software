import Layout from "@/components/EntireLayout";
import { createStyles, Button, ScrollArea, AVAILABLE_TRANSITIONS } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import { Grid, Loader } from "@mantine/core";
import { useStore } from '@/store/index';

import AvailableStaking from "../components/Staking/AvailableStaking";
import CurrentlyStaking from "../components/Staking/CurrentlyStaking";
import StakingLog from "../components/Staking/StakingStatus";
import StakeTokens from "@/components/Staking/StakeTokens";
import Token from "@/components/Token";
import StakeTable from "@/components/Staking/StakeTable";

const useStyles = createStyles((theme) => ({
  progressBar: {
    '&:not(:first-of-type)': {
      borderLeft: `3px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
    },
  }
}));

interface Props { }

export default observer((props: Props) => {
  const { god, stake, token } = useStore();

  useEffect(() => {
    if (god.currentNetwork.account != undefined) {
      console.log('account', god.currentNetwork.account);
      stake.refresh();
      token.refresh();
    }
  }, [god.currentNetwork.account]);

  // if (stake.loading || token.loading) {
  //   return <Layout><Loader size="sm"/></Layout>
  // }

  return (
    <Layout>
      <Grid>
        <Grid.Col sm={6} md={4}>
          <AvailableStaking />
        </Grid.Col>
        <Grid.Col sm={6} md={4}>
          <CurrentlyStaking />
        </Grid.Col>
        <Grid.Col sm={12} md={8}>
          <Token />
        </Grid.Col>
        <Grid.Col sm={12} md={12}>
          {stake.stakedInfo.amount > 0 && <StakingLog />}
        </Grid.Col>
        <Grid.Col sm={12} md={12}>
          {stake.stakedInfo.amount == 0 && <StakeTokens type="normal" />}
        </Grid.Col>
        <Grid.Col sm={12} md={12}>
          <StakeTable />
        </Grid.Col>
      </Grid>
    </Layout>
  );
});