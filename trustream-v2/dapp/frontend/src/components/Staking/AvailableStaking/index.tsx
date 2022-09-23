import React from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import Box from "@/components/Container/Box";
import WhiteLabel from "@/components/WhiteLabel";
import { createStyles } from '@mantine/core';


const useStyles = createStyles((theme) => ({
  textAlign : {
    paddingLeft : 0,
    paddingRight : 0,
    textAlign : 'center'
  }
}));

export default observer((props: Props) => {
  const { classes } = useStyles();

  return (
    <Box label="Available to stake">
      <WhiteLabel label="14,254" className={classes.textAlign} />
    </Box>
  );
});

interface Props { }
