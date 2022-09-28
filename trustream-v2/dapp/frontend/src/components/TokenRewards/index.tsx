import React from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import Box from '../Container/Box';
import { Button, createStyles, Grid } from '@mantine/core';
import WhiteLabel from '../WhiteLabel';
import join from "classnames";

const BREAKPOINT = '@media (max-width: 992px)';

const useStyles = createStyles((theme) => ({
  w100: {
    width: '100%'
  },
  expand: {
    width: 0
  },
  split: {
    marginBottom: 3,
    marginTop: 1,
    height: 38,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width : '100%'
  },

  gridPadding: {
    [BREAKPOINT]: {
      paddingTop: 8,
      paddingBottom: 8
    }
  },
  padding0: {
    padding: 0
  },

  padding_left: {
    padding: 0,
    paddingLeft: 4,
    [BREAKPOINT]: {
      paddingLeft: 0
    }
  },

  padding_right: {
    padding: 0,
    paddingRight: 4,
    [BREAKPOINT]: {
      paddingRight: 0
    }
  }
}));

export default observer((props: Props) => {
  const { classes } = useStyles();

  return (
    <Box label="Token Rewards">
      <Grid className={join(classes.w100, classes.gridPadding)}>
        <Grid.Col sm={12} md={6}>
          <Grid className={classes.padding_right}>
            <Grid.Col sm={12} className={classes.padding0}>
              <WhiteLabel className={classes.split} label="Claimed to date" />
            </Grid.Col>
            <Grid.Col sm={12} className={classes.padding0}>
              <WhiteLabel className={classes.split} label="0" />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col sm={12} md={6}>
          <Grid className={classes.padding_left}>
            <Grid.Col sm={12} className={classes.padding0}>
              <WhiteLabel className={classes.split} label="Available to Claim" />
            </Grid.Col>
            <Grid.Col sm={12} className={classes.padding0}>
              <WhiteLabel className={classes.split} label="0" />
            </Grid.Col>
            <Grid.Col sm={12} className={classes.padding0}>
              <Button className={classes.split} color="green">Claim Now</Button>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </Box>
  );
});

interface Props { }