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
  button: {
    fontSize : '1.2rem',
    width: '100%',
    height : '100%',
  },

  padding0 : {
    [BREAKPOINT] : {
      paddingLeft : 0,
      paddingRight : 0
    }
  },

  padding_left0: {
    paddingLeft : 0,
    [BREAKPOINT] : {
      paddingRight : 0
    }
  },

  padding_right0: {
    paddingRight : 0,
    [BREAKPOINT] : {
      paddingLeft : 0
    }
  },

  textcenter : {
    textAlign : 'center'
  }
}));

export default observer((props: Props) => {
  const { classes } = useStyles();

  const onClaimNow = (e) => {
    
  };

  return (
    <Box label="Token Rewards">
      <Grid className={join(classes.w100)}>
        <Grid.Col sm={12} md={4} className={classes.padding_left0}>
          <Grid>
            <Grid.Col sm={12}>
              <WhiteLabel label="Claimed" className={classes.textcenter}/>
            </Grid.Col>
            <Grid.Col sm={12} style={{ paddingTop : 0}}>
              <WhiteLabel label="0" className={classes.textcenter}/>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col sm={12} md={4} className={classes.padding0}>
          <Grid>
            <Grid.Col sm={12}>
              <WhiteLabel label="Available" className={classes.textcenter}/>
            </Grid.Col>
            <Grid.Col sm={12} style={{ paddingTop : 0}}>
              <WhiteLabel label="0" className={classes.textcenter}/>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col sm={12} md={4} className={classes.padding_right0}>
          <Button onClick={onClaimNow} className={classes.button} color="green">
            Claim Now
          </Button>
        </Grid.Col>
      </Grid>
    </Box>
  );
});

interface Props { }