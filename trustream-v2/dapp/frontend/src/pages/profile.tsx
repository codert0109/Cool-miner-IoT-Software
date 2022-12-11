import Layout from '@/components/EntireLayout';
import { createStyles } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import EmailMgr from '@/components/EmailMgr';
import NotificationSetting from '@/components/NotificationSetting';
import { LoadingOverlay } from '@mantine/core';
import { useStore } from '../store';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  progressBar: {
    '&:not(:first-of-type)': {
      borderLeft: `3px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`
    }
  }
}));


export default observer((props: Props) => {
  const { god, auth, profile } = useStore();

  const [overlayVisible, setOverLayVisible] = useState(true);

  const router = useRouter();
  
  const passAuthentication = () => {
    setOverLayVisible(false);
    profile.refresh();
  };

  useEffect(() => {
    setOverLayVisible(true);

    if (god.currentNetwork.account == null)
      return;

    auth.check_auth(() => {
      passAuthentication();
    }, () => {
      Swal.fire({
        title: 'info',
        html: `You need to be authenticated in order to access profile page.`,
        icon: 'info',
        showCancelButton: true,
      }).then((result) => {
        if (!result.isConfirmed) { // if cancel clicked
          router.push('/');
          return;
        }

        auth.login(() => {
          passAuthentication();
        }, () => {
          router.push('/');
        });
      });
    });
  }, [god.currentNetwork.account]);

  return (
    <Layout>
      <LoadingOverlay visible={overlayVisible}/>
      <EmailMgr />
      <NotificationSetting/>
    </Layout>
  );
});

interface Props {}