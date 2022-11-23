import Layout from '@/components/EntireLayout';
import { createStyles, Button, ScrollArea } from '@mantine/core';
import React from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import EmailMgr from '@/components/EmailMgr';
import NotificationSetting from '@/components/NotificationSetting';

const useStyles = createStyles((theme) => ({
  progressBar: {
    '&:not(:first-of-type)': {
      borderLeft: `3px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`
    }
  }
}));


export default observer((props: Props) => {
  const store = useLocalObservable(() => ({
    count: 0,
    setCount(count) {
      this.count = count;
    }
  }));
  return (
    <Layout>
      <EmailMgr />
      <NotificationSetting/>
    </Layout>
  );
});

interface Props {}