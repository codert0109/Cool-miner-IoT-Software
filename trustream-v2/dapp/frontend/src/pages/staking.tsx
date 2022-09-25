import Layout from "@/components/EntireLayout";
import { createStyles, Button, ScrollArea, AVAILABLE_TRANSITIONS } from '@mantine/core';
import React from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import { Grid } from "@mantine/core";

import AvailableStaking from "../components/Staking/AvailableStaking";
import CurrentlyStaking from "../components/Staking/CurrentlyStaking";
import StakingLog from "../components/Staking/StakingLog";
import StakeTokens from "@/components/Staking/StakeTokens";
import Token from "@/components/Token";

const useStyles = createStyles((theme) => ({
  progressBar: {
    '&:not(:first-of-type)': {
      borderLeft: `3px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
    },
  }
}));

interface Props { }

export default observer((props: Props) => {
  const { classes } = useStyles();

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
          <StakeTokens />
        </Grid.Col>
        <Grid.Col sm={12} md={12}>
          <StakingLog />
        </Grid.Col>
      </Grid>
    </Layout>
  );
});