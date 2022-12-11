import React from 'react';
import { observer } from 'mobx-react-lite';
import { Burger, Container, createStyles, Group, Header, Text, useMantineTheme } from '@mantine/core';
import DesktopNav from './DesktopNav';
import { WalletInfo } from '../WalletInfo';
import { useStore } from '@/store/index';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  header_logo : {
    cursor : 'pointer'
  },

  shadowStyle : {
    boxShadow : 'rgb(255 255 255 / 19%) 0px 2px 10px 5px',
    opacity : theme.colorScheme == 'dark' ? 1.0 : 0.95,
    zIndex : 101
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none'
    }
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none'
    }
  },

  ContainerStyle : {
    maxWidth : 'none',
  }
}));



export const index = observer(() => {
  const { classes } = useStyles();
  const { user } = useStore();
  const theme = useMantineTheme();
  const { god, lang } = useStore();
  const router = useRouter();

  return (
    <Header height={56} className={classes.shadowStyle}>
      <Container className={classes.ContainerStyle}>
        <div className={classes.inner}>
          <div className={classes.header_logo} onClick={() => router.reload()}>
            {theme.colorScheme === 'dark' && <img src="/images/logo/White-Square-E-75px.png" height={36}/>}
            {theme.colorScheme !== 'dark' && <img src="/images/logo/Black-Square-E-75px.png" height={36}/>}          
          </div>
          {/* <Text>Elumicate</Text> */}
          <Group spacing={5} className={classes.links}>
            <DesktopNav />
          </Group>
          {
            god.currentNetwork.account ?
            <Burger 
              opened={user.layout.sidebarOpen.value} 
              onClick={() => user.layout.sidebarOpen.setValue(!user.layout.sidebarOpen.value)} 
              className={classes.burger} size="sm" /> 
            : 
            <Text
              color={'pink'}
              style={{
                borderRadius: '1.25rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                color: '#fff',
                background: 'linear-gradient(90deg, rgb(224, 49, 49) 0%, rgb(230, 73, 128) 100%)'
              }}
              onClick={() => god.setShowConnecter(true)}
              py="0.25rem"
              px="0.8rem"
              className={classes.burger}
            >
              Connect Wallet
            </Text>
          }
        </div>
      </Container>
      <WalletInfo />
    </Header>
  );
})

export default index;
