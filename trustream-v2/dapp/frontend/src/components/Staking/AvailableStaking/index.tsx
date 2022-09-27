import React, { useEffect, useState } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import Box from "@/components/Container/Box";
import WhiteLabel from "@/components/WhiteLabel";
import { createStyles } from '@mantine/core';
import { useStore } from '../../../store/index';

const useStyles = createStyles((theme) => ({
  textAlign: {
    paddingLeft: 0,
    paddingRight: 0,
    textAlign: 'center'
  }
}));

export default observer((props: Props) => {
  const { classes } = useStyles();
  const { god, token } = useStore();

  const [balance, setBalance] = useState('0');

  const refresh = async () => {
    let value: string;
    value = await token.getBalance();
    setBalance(value);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <Box label="Available to stake">
      <WhiteLabel label={ balance } className={classes.textAlign} />
    </Box>
  );
});

interface Props { }
