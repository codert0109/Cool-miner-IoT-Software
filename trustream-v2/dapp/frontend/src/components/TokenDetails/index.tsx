import React from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import Box from "@/components/Container/Box";
import { createStyles, Grid, Button } from '@mantine/core';
import WhiteLabel from "@/components/WhiteLabel";

const useStyles = createStyles((theme) => ({
  gridPadding: {
    paddingLeft: '0px !important',
    paddingRight: '0px !important'
  },
  price : {
    color : '#2f9e44'
  },
  button : {
    width : '100%',
    fontSize : '1.2em'
  }
}));

export default observer((props: Props) => {
  const { classes } = useStyles();

  return (
    <Box label="Buy ELUM" bodyClass={classes.gridPadding}>
      <Grid style={{ width: '100%' }} columns={60}>
        <Grid.Col lg={12} md={20} sm={60}>
          <Grid>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className="" label="Name" />
            </Grid.Col>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className="" label="ELUM" />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col lg={12} md={20} sm={60}>
          <Grid>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className="" label="Price" />
            </Grid.Col>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className="" label="CA$ 100" />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col lg={12} md={20} sm={60}>
          <Grid>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className="" label="Change" />
            </Grid.Col>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className={classes.price} label="+1.05%" />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col lg={12} md={30} sm={60}>
          <Grid>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className="" label="Chart" />
            </Grid.Col>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className="" label="..." />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col lg={12} md={30} sm={60}>
          <Grid>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className="" label="Trade" />
            </Grid.Col>
            <Grid.Col md={12} sm={12}>
              <Button color='green' size="xs" className={classes.button}>Buy</Button>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </Box>
  );
});

interface Props { }