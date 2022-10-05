import React from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import { Box, Button, createStyles } from '@mantine/core';


const useStyles = createStyles((theme) => ({
}));


export default observer((props: Props) => {
  const { classes } = useStyles();

  const store = useLocalObservable(() => ({
    count: 0,
    setCount(count) {
      this.count = count;
    }
  }));
  return (
    <Box>
      <Box>Template: {store.count}</Box>
      <Button onClick={() => store.setCount(store.count + 1)}>+</Button>
      <Button onClick={() => store.setCount(store.count - 1)}>-</Button>
    </Box>
  );
});

interface Props {}