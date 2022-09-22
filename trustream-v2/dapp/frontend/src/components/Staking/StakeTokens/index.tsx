import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useInterval } from '@mantine/hooks';
import Box from "@/components/Container/Box";
import WhiteLabel from "@/components/WhiteLabel";
import { Grid } from "@mantine/core";
import { createStyles, Button, Progress } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  button: {
    position: 'relative',
    transition: 'background-color 150ms ease',
    minWidth: '100%',
    maxWidth: '100%',
    width: '100%',
    height: '100%',
    fontSize : '1.5rem'
  },

  progress: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    left: -1,
    top: -1,
    height: 'auto',
    backgroundColor: 'transparent',
    zIndex: 0,
  },

  label: {
    position: 'relative',
    zIndex: 1,
  },

  text : {
    whiteSpace : 'nowrap',
    textOverflow : 'ellipsis',
    overflow : 'hidden'
  }
}));

export default observer((props: Props) => {
  const { classes, theme } = useStyles();
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const interval = useInterval(
    () =>
      setProgress((current) => {
        if (current < 100) {
          return current + 1;
        }

        interval.stop();
        setLoaded(true);
        return 0;
      }),
    20
  );

  return (
    <Box label="Stake Tokens">
      <Grid style={{ width: '100%' }}>
        <Grid.Col lg={3} md={6} sm={12}>
          <Grid>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className="" label="Number of Tokens" />
            </Grid.Col>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className="" label="........." />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col lg={3} md={6} sm={12}>
          <Grid>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className="" label="NFT id" />
            </Grid.Col>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className={classes.text} label="Click to browser Your NFTs" />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col lg={3} md={6} sm={12}>
          <Grid>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className="" label="Stake Duration" />
            </Grid.Col>
            <Grid.Col md={3} sm={3}>
              <WhiteLabel className="" label="45" />
            </Grid.Col>
            <Grid.Col md={3} sm={3}>
              <WhiteLabel className="" label="90" />
            </Grid.Col>
            <Grid.Col md={3} sm={3}>
              <WhiteLabel className="" label="180" />
            </Grid.Col>
            <Grid.Col md={3} sm={3}>
              <WhiteLabel className="" label="360" />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col lg={3} md={6} sm={12}>
          <Button
            className={classes.button}
            onClick={() => (loaded ? setLoaded(false) : !interval.active && interval.start())}
            color={loaded ? 'teal' : 'yellow'}
          >
            <div className={classes.label}>
              {progress !== 0 ? 'Waiting' : loaded ? 'Success!' : 'Stake'}
            </div>
            {progress !== 0 && (
              <Progress
                value={progress}
                className={classes.progress}
                color={theme.fn.rgba(theme.colors[theme.primaryColor][2], 0.35)}
                radius="sm"
              />
            )}
          </Button>
        </Grid.Col>
      </Grid>
    </Box>
  );
});

interface Props { }