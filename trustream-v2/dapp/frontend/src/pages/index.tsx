import Layout from "@/components/EntireLayout";
import { useEffect } from "react";
import { useRouter } from 'next/router';

import { Grid } from "@mantine/core";
import STAKEDCLAIMED from "@/components/STAKEDCLAIMED";
import EARNED from "@/components/EARNED";
import BUYELUM from "@/components/BUYELUM";
import INFOCONTAINER from "@/components/INFOCONTAINER";
import LogBook from "@/components/LogBook";
import MyAccount from "@/components/MyAccount";

import UPTIME from "@/components/UPTIME";
import ServerStatus from "@/components/ServerStatus";
import UpdateInfoTable from "@/components/UpdateInfoTable";
import Box from "@/components/Container/Box";
import WalletBalance from "@/components/WalletBalance";
import TokenRewards from "@/components/TokenRewards";

export default function () {
  const router = useRouter()

  useEffect(() => {
    // router.push('/nft');
  }, []);

  return (
    <Layout>
      <Grid>
        <Grid.Col sm={12} md={6}>
          <UPTIME label="Public Pool Mining" />
        </Grid.Col>
        <Grid.Col sm={12} md={6}>
          <WalletBalance/>
        </Grid.Col>
        <Grid.Col sm={12} md={6}>
          <ServerStatus />
        </Grid.Col>
        <Grid.Col sm={12} md={6}>
          <TokenRewards />
        </Grid.Col>
        <Grid.Col sm={12} md={12}>
          <Box label="Release Updates">
            <UpdateInfoTable/>
          </Box>
        </Grid.Col>
      </Grid>
      {/* <Grid>
        <Grid.Col xs={12}>
          <Grid style={{paddingLeft : '36px'}}>
            <Grid.Col sm={6} md={3}>{<STAKEDCLAIMED label="STACKED" />}</Grid.Col>
            <Grid.Col sm={6} md={3}>{<STAKEDCLAIMED label="CLAIMED" />}</Grid.Col>
            <Grid.Col sm={6} md={3}>{<EARNED label="EARNED" />}</Grid.Col>
            <Grid.Col sm={6} md={3}>{<BUYELUM label="BUY TOKENS" />}</Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col xs={12}>
          <INFOCONTAINER caption="MY ACCOUNT">
            <MyAccount />
          </INFOCONTAINER>
        </Grid.Col>
        <Grid.Col xs={12}>
          <INFOCONTAINER caption="LOGBOOK">
            <LogBook />
          </INFOCONTAINER>
        </Grid.Col>
      </Grid> */}
    </Layout>
  );
}