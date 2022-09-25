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
  price: {
    color: '#2f9e44'
  },
  button: {
    width: '100%',
    fontSize: '1.5rem',
    height : '100%',
  }
}));

export default observer((props: Props) => {
  const { classes } = useStyles();

  return (
    <Box label="Buy ELUM Tokens" bodyClass={classes.gridPadding}>
      <Grid style={{ width: '100%' }}>
        <Grid.Col md={4} sm={12}>
          <Grid>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className="" label="Token Amount" />
            </Grid.Col>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className="" label="........." />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col md={4} sm={12}>
          <Grid>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className="" label="Price" />
            </Grid.Col>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className="" label="1 IOTX" />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col md={4} sm={12}>
          <Button color='green' size="xs" className={classes.button}>Buy</Button>
        </Grid.Col>
      </Grid>
    </Box>
  );
});

interface Props { }