import Layout from "@/components/EntireLayout";
import { useEffect } from "react";
import { useRouter } from 'next/router';

export default function () {
  const router = useRouter()

  useEffect(() => {
    router.push('/nft');
  }, []);

  return (
    <Layout>
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