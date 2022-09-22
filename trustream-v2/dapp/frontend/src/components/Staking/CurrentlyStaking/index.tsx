import React from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import Box from "@/components/Container/Box";
import WhiteLabel from "@/components/WhiteLabel";

interface Props { }

export default observer((props: Props) => {
  return (
    <Box label="Currently Staked">
      <WhiteLabel label="2,500" className="" />
    </Box>
  );
});
