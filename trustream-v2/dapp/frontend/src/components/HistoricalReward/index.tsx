import React, { useEffect, useState } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import Box from '@/components/Container/Box';
import { Button, createStyles, ScrollArea, Table } from '@mantine/core';
import classnames from 'classnames';
import { formatDecimalWeb3, formatUpTime } from '@/utils/index';
import { useStore } from '@/store/index';
import { publicConfig } from '../../config/public';
import HistoricalPeriod from './HistoricalPeriod';

const { BACKEND_URL } = publicConfig;

const BREAKPOINT = '@media (max-width: 992px)';

const useStyles = createStyles((theme) => ({
  NFTTable: {
    background: 'white',
    color: 'black',
    width: '100%'
  },

  thead: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]}`
    }
  },

  orange: {
    backgroundColor: 'rgb(255, 102, 0)'
  },

  th: {
    // borderBottom: '1px solid black',
    // color : 'black'
    textAlign: 'center !important' as any,
    color: 'black !important'
  },

  center: {
    textAlign: 'center'
  },

  green: {
    color: 'green'
  },

  centerAlign: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '36px'
  },

  imgStyle: {
    height: 30,
    transform: 'translate(0px, 2px)'
  },

  minerName: {
    position: 'absolute',
    top: 3,
    paddingRight: 5,
    backgroundColor: 'black',
    left: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  body: {
    display: 'flex',
    width: '100%',
    [BREAKPOINT]: {
      display: 'block'
    }
  },

  leftChild: {
    flexGrow: 1,
    flexShrink: 1
  },

  rightChild: {
    width: 130,
    marginLeft: 10,
    [BREAKPOINT]: {
      display: 'flex',
      width: '100%',
      marginLeft: 0,
      marginTop: 5
    }
  },

  spliter: {
    height: 2,
    [BREAKPOINT]: {
      width: 2
    }
  },

  scrolled: {
    boxShadow: theme.shadows.sm
  }
}));

export default observer((props: Props) => {
  const { auth } = useStore();
  const { classes, cx } = useStyles();

  const [scrolled, setScrolled] = useState(false);

  const renderLabel = () => {
    return (
      <div className={classes.centerAlign}>
        <span>Historical Rewards</span>
      </div>
    );
  };

  const formatRound = (x) => {
    return Math.round(x * 10000) / 10000 + '';
  };

  const renderHeader = () => {
    return (
      <>
        {renderLabel()}
        <div className={classes.minerName}>
          {/* {status === false && <img src="/images/status/stopped.png" className={classes.imgStyle}></img>}
                    {status === true && <img src="/images/status/working.png" className={classes.imgStyle}></img>} */}
          <img src="/images/status/working.png" className={classes.imgStyle}></img>
          {props.nft_id}
        </div>
      </>
    );
  };

  return (
    <Box label={renderHeader()}>
      <div className={classes.body}>
        <div className={classes.leftChild}>
          <ScrollArea sx={{ height: '180px', width: '100%' }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Table className={classes.NFTTable}>
              <thead className={cx(classes.thead, { [classes.scrolled]: scrolled })}>
                <tr>
                  <th className={classes.th} key="1">
                    Epoch Time
                  </th>
                  <th className={classes.th} key="2">
                    Mining Time
                  </th>
                  <th className={classes.th} key="3">
                    Multiplier
                  </th>
                  <th className={classes.th} key="4">
                    Epoch Reward
                  </th>
                  {/* <th className={classes.th} key="4">Total Uptime</th> */}
                </tr>
              </thead>
              <tbody>
                {props.info.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className={classnames(classes.center, classes.green)} key="1">
                        {formatUpTime(item.epoch)}
                      </td>
                      <td className={classes.center} key="2">
                        {item.uptime / 60} Minutes
                      </td>
                      <td className={classes.center} key="3">
                        X {item.multiplier / 10000}
                      </td>
                      <td className={classes.center} key="4">
                        {item.reward == null ? 0 : formatDecimalWeb3(BigInt(item.reward))} ELUM
                      </td>
                      {/* <td className={classes.center} key="5">10800 minutes</td> */}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </ScrollArea>
        </div>
        <div className={classes.rightChild}>
          <HistoricalPeriod label="Past Day" token={formatRound(props.history[0])} />
          <div className={classes.spliter}></div>
          <HistoricalPeriod label="Past Week" token={formatRound(props.history[1])} />
          <div className={classes.spliter}></div>
          <HistoricalPeriod label="Past Month" token={formatRound(props.history[2])} />
        </div>
      </div>
    </Box>
  );
});

interface Props {
  nft_id: number;
  info: any;
  history: Array<string>;
}
