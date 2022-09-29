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

export default function () {
  return (
    <Layout>
      <Grid>
        <Grid.Col sm={12} md={5}>
          <Grid>
            <Grid.Col sm={12}>
              <UPTIME label="Public Pool Mining" />
            </Grid.Col>
            <Grid.Col sm={12}>
              <ServerStatus />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col sm={12} md={7}>
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
        {/* <Grid.Col sm={12} md={6}>
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
        */}
      </Grid>
    </Layout>
  );
}