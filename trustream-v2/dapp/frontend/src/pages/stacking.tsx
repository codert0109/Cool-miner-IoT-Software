import Layout from "@/components/EntireLayout";
import { createStyles, Button, ScrollArea } from '@mantine/core';
import React from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';

const useStyles = createStyles((theme) => ({
    progressBar: {
        '&:not(:first-of-type)': {
            borderLeft: `3px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
        },
    },
}));

interface Props {}

export default observer((props: Props) => {
  const store = useLocalObservable(() => ({
    count: 0,
    setCount(count) {
      this.count = count;
    }
  }));
  return (
    <Layout>
        <ScrollArea>
            Stacking Sample Page
        </ScrollArea>
    </Layout>
  );
});