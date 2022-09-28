import React, { useEffect } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import Box from "@/components/Container/Box";
import WhiteLabel from "@/components/WhiteLabel";
import { createStyles, Loader } from '@mantine/core';
import { useStore } from '../../../store/index';

interface Props { }

const useStyles = createStyles((theme) => ({
  textAlign : {
    paddingLeft : 0,
    paddingRight : 0,
    textAlign : 'center'
  },
  center_container : {
    height : 24,
    display : 'flex',
    alignItems : 'center',
    paddingLeft : 15
  }
}));

export default observer((props: Props) => {
  const { classes } = useStyles();
  const { god, stake } = useStore();

  useEffect(() => {
    stake.refresh();
  }, [god.currentNetwork.account]);

  const renderElementWithLoader = (element) => {
    if (stake.loading) {
      return (
        <div className={classes.center_container}>
          <Loader size={18}/>
        </div>
      )
    }
    return element;
  };

  return (
    <Box label="Currently Staked">
      <WhiteLabel label={
        renderElementWithLoader(
          <>{stake.staked_tokens}</>
        )
      } className={classes.textAlign}  />
    </Box>
  );
});
