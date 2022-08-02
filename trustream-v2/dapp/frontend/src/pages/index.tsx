import Layout from "@/components/EntireLayout";
import { createStyles, Container, Text, Button, Grid, Group, Skeleton, useMantineTheme, Anchor } from '@mantine/core';
import STAKEDCLAIMED from "@/components/STAKEDCLAIMED";
import BUYELUM from "@/components/BUYELUM";
import INFOCONTAINER from '@/components/INFOCONTAINER';
import MyAccount from '@/components/MyAccount';
import LogBook from '@/components/LogBook';
import EARNED from "@/components/EARNED";

export default function () {
  return (
    <Layout>
      <Grid>
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
      </Grid>
    </Layout>
  );
}