import Layout from "@/components/EntireLayout";
import { Grid } from "@mantine/core";
import UPTIME from "@/components/UPTIME";
import ServerStatus from "@/components/ServerStatus";
import UpdateInfoTable from "@/components/UpdateInfoTable";
import Box from "@/components/Container/Box";
import WalletBalance from "@/components/WalletBalance";
import TokenRewards from "@/components/TokenRewards";
import Token from "@/components/Token";
import TokenTransfer from "@/components/TokenTransfer";
import { useLocalObservable, observer } from 'mobx-react-lite';

import React, { useEffect } from 'react';
import { useStore } from '@/store/index';

export default observer((props) => {
  const { god, token } = useStore();

  useEffect(() => {
    if (god.currentNetwork.account != undefined) {
      token.refresh();
    }
  }, [god.currentNetwork.account]);
  
  return (
    <Layout>
      <Grid>
        <Grid.Col sm={12} md={9}>
          <Grid>
            <Grid.Col sm={12}>
              <WalletBalance/>
            </Grid.Col>
            <Grid.Col sm={12}>
              <TokenRewards/>
            </Grid.Col>
            <Grid.Col sm={12}>
              <TokenTransfer/>
            </Grid.Col>
            <Grid.Col sm={12}>
              <Token/>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col sm={12} md={12}>
          <Box label="Release Updates">
            <UpdateInfoTable/>
          </Box>
        </Grid.Col>
      </Grid>
    </Layout>
  );
});