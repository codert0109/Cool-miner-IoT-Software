import React, { useEffect, useState } from 'react';
import { observer, Observer, useLocalObservable } from 'mobx-react-lite';
import { useStore } from '@/store/index';
import { helper } from '@/lib/helper';
import { Box, Center, createStyles, Menu, Text } from '@mantine/core';
import NFTContractABI from '../../contracts/ElumNFT.json';
import ContractAddress from '../../contracts/contract-address.json';

import {
  ChevronDown,
  Home,
  CloudDataConnection,
  Stack2,
  ZoomMoney,
  FileDatabase,
  Lock
} from 'tabler-icons-react';

import { useRouter } from 'next/router';
import Link from 'next/link';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    links: {
      [theme.fn.smallerThan('sm')]: {
        display: 'none'
      }
    },
    link: {
      display: 'flex',
      alignItems: 'center',
      lineHeight: 1,
      padding: '8px 12px',
      borderRadius: theme.radius.sm,
      textDecoration: 'none',
      // color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,

      cursor: 'pointer',
      fontFamily: 'Proxima-Nova-Bold',
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
      }
    },
    linkLabel: {
      marginRight: 5
    },
    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm
    },
    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25) : theme.colors[theme.primaryColor][0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.colors[theme.primaryColor][7],
        [`& .${icon}`]: {
          color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 7]
        }
      }
    }
  };
})



interface HeaderSearchProps {
  link: string;
  label: string;
  icon: any;
  links?: {
    link?: string;
    label?: string;
  }[];
  access : string;
}

const links: Array<HeaderSearchProps> = [
  {
    link: '/',
    label: 'Dashboard',
    icon: Home,
    access : 'public'
  },
  {
    link: '/miners',
    label: 'Miners',
    icon: FileDatabase,
    access : 'public'
  },
  {
    link: '/nft',
    label: 'NFT',
    icon: Stack2,
    access : 'public'
  },
  {
    link: '/staking',
    label: 'Staking',
    icon: ZoomMoney,
    access : 'public'
  },
  {
    link: '/viewdata',
    label: 'View Data',
    icon: CloudDataConnection,
    access : 'public'
  },
  {
    link: '/admin',
    label: 'Admin',
    icon: Lock,
    access : 'admin'
  },
];

const DesktopNav = observer((props) => {
  const { god, lang, user } = useStore();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Home');
  const router = useRouter();

  const store = useLocalObservable(() => ({
    showConnecter() {
      god.setShowConnecter(true);
    },
    showWalletInfo() {
      god.currentNetwork.walletInfo.visible = true;
    },
    currentAvatar: 1
  }));

  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    const NFTContractAddress = ContractAddress.ElumNFT;
    god.currentNetwork.execContract({
      address : NFTContractAddress,
      abi : NFTContractABI.abi,
      method : 'owner'
    }).then((data) => {
      if (data == god.currentNetwork.account) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    }).catch(() => {
      setAdmin(false);
    });
  }, [god.currentNetwork.account]);
  
  const items = links.filter((item) => item.access === 'public' || (item.access === 'admin' && isAdmin)).map((link) => {
    const menuItems = link.links?.map((item) => <Menu.Item key={item.link}>{item.label}</Menu.Item>);
    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          delay={0}
          transitionDuration={0}
          placement="end"
          gutter={1}
          control={
            <a href={link.link} className={classes.link}
              onClick={() => {
                user.layout.sidebarOpen.setValue(false);
              }}>
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <ChevronDown size={12} />
              </Center>
            </a>
          }
        >
          {menuItems}
        </Menu>
      );
    }

    return (
      <Link href={link.link} key={link.label}>
        <Box
          className={cx(classes.link, { [classes.linkActive]: link.link === router.route })}
          sx={{ cursor: 'pointer' }}
          onClick={(event) => {
            setActive(link.label);
          }}
        >
          <link.icon className={classes.linkIcon} />
          <span>{link.label}</span>
        </Box>
      </Link>
      // <a
      //   key={link.label}
      //   href={link.link}
      //   className={classes.link}
      //   style={{
      //     color: router.asPath === link.link ? '#ff3998' : '#000',
      //     display: 'flex',
      //     alignItems: 'center'
      //   }}
      // >
      //   {link.icon && <link.icon size={20} />}
      //   <Text ml={5}>
      //     {link.label}
      //   </Text>
      // </a>
    );
  });

  // {!god.currentNetwork.account &&
  const accountView =
    <Observer>
      {() => {
        if (!god.currentNetwork.account) {
          return (
            <Text
              color={'pink'}
              style={{
                borderRadius: '1.25rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                color: '#fff',
                background: 'linear-gradient(90deg, rgb(224, 49, 49) 0%, rgb(230, 73, 128) 100%)'
              }}
              onClick={store.showConnecter}
              py="0.25rem"
              px="0.8rem"
            >
              Connect Wallet
            </Text>
          );
        }

        return (
          <>
            {god.currentNetwork.account && (
              <Box mr="1rem" color="pink">
                {/* <Person /> */}
                {/* <Box style={{ borderRadius: '50%' }} ml={5}>
                  <Jazzicon diameter={30} address={god.currentNetwork.account || '0x......'} />
                </Box> */}
              </Box>
            )}
            <Box
              style={{ display: 'flex', fontWeight: 'semibold', cursor: 'pointer', borderRadius: '1.25rem' }}
              sx={(theme) => ({
                background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
              })}
              onClick={store.showWalletInfo}
            >
              <Box style={{ background: '#edfff6', borderRadius: '1.25rem' }} py="0.25rem" px="8px" mr="0.5rem">
                <Text
                  style={{
                    color: 'rgb(67, 201, 186)'
                  }}
                >
                  0x
                </Text>
              </Box>
              <Text mr={2} pr="2" py="0.25rem">
                {helper.string.truncate(god.currentNetwork.account, 10, '...')}
              </Text>
            </Box>
          </>
        );
      }}
    </Observer>;

  return (
    <>
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        {god.currentNetwork.account ? items : undefined}
        {accountView}
      </Box>
    </>
  );
});

DesktopNav.displayName = 'DesktopNav';
export default DesktopNav;
