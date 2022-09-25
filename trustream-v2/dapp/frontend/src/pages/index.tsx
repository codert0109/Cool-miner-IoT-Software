import Layout from "@/components/EntireLayout";
import { Grid } from "@mantine/core";
import UPTIME from "@/components/UPTIME";
import ServerStatus from "@/components/ServerStatus";
import UpdateInfoTable from "@/components/UpdateInfoTable";
import Box from "@/components/Container/Box";
import WalletBalance from "@/components/WalletBalance";
import TokenRewards from "@/components/TokenRewards";
import Token from "@/components/Token";

export default function () {
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
          <Token />
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