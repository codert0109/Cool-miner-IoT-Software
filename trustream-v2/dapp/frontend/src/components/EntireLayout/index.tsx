import React from 'react';
import { createStyles, Container, Skeleton, useMantineTheme, Text } from '@mantine/core';
import MainLayout from '@/components/Layout';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../store';
import { BrandGoogleDrive } from 'tabler-icons-react';
import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { observer, useObserver, useLocalObservable } from 'mobx-react-lite';
import LoginMsgShow from "../LoginMsgShow";

// import { LanguageSwitch } from '@/components/LanguageSwitch';

const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    boxSizing: 'border-box',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : '#ffffffdb',
    boxShadow : theme.colorScheme === 'dark' ? '0px 0px 6px 6px #00000030' : '0px 0px 6px 6px #ffffffdb'
  },

  inner: {
    position: 'relative',
    paddingLeft : 0,
    paddingRight : 0,
    maxWidth : 'none'
    // paddingTop: 200,
    // paddingBottom: 120,

    // [BREAKPOINT]: {
    //   paddingBottom: 80,
    //   paddingTop: 80
    // }
  },

  title: {
    fontFamily: `Proxima-Nova, ${theme.fontFamily}`,
    fontSize: 62,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,

    [BREAKPOINT]: {
      fontSize: 42,
      lineHeight: 1.2
    }
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: 24,

    [BREAKPOINT]: {
      fontSize: 18
    }
  },

  controls: {
    marginTop: theme.spacing.xl * 2,

    [BREAKPOINT]: {
      marginTop: theme.spacing.xl
    }
  },

  control: {
    height: 54,
    paddingLeft: 38,
    paddingRight: 38,

    [BREAKPOINT]: {
      height: 54,
      paddingLeft: 18,
      paddingRight: 18,
      flex: 1
    }
  },

  githubControl: {
    borderWidth: 2,
    borderColor: theme.colorScheme === 'dark' ? 'transparent' : theme.colors.dark[9],
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : 'transparent',

    '&:hover': {
      backgroundColor: `${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]} !important`
    }
  },

  paddingLeft: {
    paddingLeft: '36px'
  },

  loginMsgDiv : {
    width : '100%',
    height : '100%',
    fontSize : '2em',
    fontWeight : 'bold',
    textAlign: 'center'
  }
}));

const child = <Skeleton height={140} radius="md" animate={false} />;

const HeroTitle = observer(({children}) => {
  const { classes } = useStyles();
  const { god } = useStore();
  const store = useLocalObservable(() => ({
    showConnecter() {
      god.setShowConnecter(true);
    },
    showWalletInfo() {
      god.currentNetwork.walletInfo.visible = true;
    },
    currentAvatar: 1
  }));

  const login_status = useObserver(() => {
    return (
      <MainLayout>
        <div className={classes.wrapper}>
          <Container className={classes.inner}>
            {god.currentNetwork.account ? children : <LoginMsgShow className={classes.loginMsgDiv}/>}
          </Container>
        </div>
      </MainLayout>
    );
  });

  return (
    <>
       { login_status }
    </>
  );
});

HeroTitle.displayName = 'HeroTitle';
export default HeroTitle;