import React from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import Box from "@/components/Container/Box";
import WhiteLabel from "@/components/WhiteLabel";
import { createStyles } from '@mantine/core';

interface Props { }

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
    <Box label="Currently Staked">
      <WhiteLabel label="2,500" className={classes.textAlign}  />
    </Box>
  );
});
