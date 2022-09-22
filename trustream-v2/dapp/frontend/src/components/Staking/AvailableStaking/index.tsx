import React from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import Box from "@/components/Container/Box";
import WhiteLabel from "@/components/WhiteLabel";

interface Props { }

export default observer((props: Props) => {
  return (
    <Box label="Available to stake">
      <WhiteLabel label="14,254" className="" />
    </Box>
  );
});
