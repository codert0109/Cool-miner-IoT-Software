import React from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import Box from "@/components/Container/Box";
import { Button, createStyles } from '@mantine/core';
import classnames from 'classnames';

const useStyles = createStyles((theme) => ({
  NFTTable: {
    background: 'white',
    color: 'black',
    width: '100%'
  },
  
  thead: {
    borderBottom: '1px solid black',
  },

  orange : {
    backgroundColor : 'rgb(255, 102, 0)'
  },

  th: {
    borderBottom: '1px solid black'
  },

  center: {
    textAlign: 'center'
  },

  green : {
    color : 'green'
  }
}));


export default observer((props: Props) => {
  const { classes } = useStyles();

  return (
    <Box label="Overall Network Stats" headerClass={classes.orange}>
      <table className={classes.NFTTable}>
        <thead className={classes.thead}>
          <tr>
            <th className={classes.th} key="1">Epoch Duration</th>
            <th className={classes.th} key="2">Active Miners</th>
            <th className={classes.th} key="3">Accumulated Weight Rating</th>
            <th className={classes.th} key="4">Epoch Rewards</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={classnames(classes.center, classes.green)} key="1">60 Minutes</td>
            <td className={classes.center} key="2">10,255</td>
            <td className={classes.center} key="3">2449.25</td>
            <td className={classes.center} key="4">2000 ELUM</td>
          </tr>
        </tbody>
      </table>
    </Box>
  );
});

interface Props { }