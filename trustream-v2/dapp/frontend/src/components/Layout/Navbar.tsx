import React, { useState } from 'react';
import { createStyles, Navbar, Group, Box, TextInput, Code, Space, ThemeIcon, Text, Modal } from '@mantine/core';
import {
  Home,
  Code as CodeIcon,
  Search,
  CloudDataConnection as ViewIcon,
  Stack,
  News,
  Help,
  Stack2
}
  from 'tabler-icons-react';
import { useStore } from '../../store/index';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { SwitchThemeToggle } from './SwitchTheme';
import { openSpotlight } from '@mantine/spotlight';
import { User } from './User';
import { WalletInfo } from '../WalletInfo';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md
      // borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : 'black',
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black
        }
      }
    },

    searchCode: {
      fontWeight: 700,
      fontSize: 10,
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]}`
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
    },

    navbar_title : {
      color : theme.colorScheme === 'dark' ? 'white' : 'black'
    }
  };
});

export const NavbarSimple = observer(() => {
  const { classes, cx, theme } = useStyles();
  const { t } = useTranslation();
  const { user, god } = useStore();
  const router = useRouter();

  const [isview, setView] = useState(false);

  const data = [
    { link: '/',                                          label: t('dashboard'),  icon: Home,     __blank : false },
    { link: '/nft',                                       label: 'NFT',           icon: ViewIcon, __blank : false },
    { link: '/viewdata',                                  label: 'View Data',     icon: ViewIcon, __blank : false },
    { link: 'https://www.elumicate.com/elumicate-news/',  label: 'News',          icon: News,     __blank : true },
    { link: 'https://www.elumicate.com/',                 label: 'About US',      icon: Help,     __blank : true },
  ];

  const links = data.map((item) => (
    <Box
      className={cx(classes.link, { [classes.linkActive]: item.link === router.route })}
      sx={{ cursor: 'pointer' }}
      onClick={(event) => {
        if (item.link) {
          // if (item.label == 'View Data') {
          //   setView(false);
          // }
          if (item.__blank) {
            window.open(item.link, '_blank');
          } else {
            router.push(item.link);
          }
        }
      }}
    >
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </Box>
  ));

  // if (user.layout.sidebarOpen.value) {
  //   return <></>
  // }

  return (

    <Navbar 
      style={{ 
        // backgroundColor: '#000000C0',
        // backgroundColor: '#C7C7C7C0',
        backgroundColor : theme.colorScheme == 'dark' ? '#000000C0' : '#C7C7C7F0',
        boxShadow : 'rgb(255 255 255 / 19%) 2px 0px 10px 0px'
      }}
      p="md" 
      hiddenBreakpoint="sm" 
      hidden={!user.layout.sidebarOpen.value} 
      width={{ sm: 200, lg: 300 }}>
      <Navbar.Section grow>
        <Group className={classes.header} position="apart" align={'center'}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            {/* <ThemeIcon size="lg" radius="xl" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
              <CodeIcon />
            </ThemeIcon> */}
            <Text className={classes.navbar_title} weight="bold" size="lg">
              Elumicate Dapp V1
            </Text>
          </Box>
        </Group>

        <TextInput
          placeholder={t('search')}
          size="xs"
          mt="lg"
          icon={<Search size={12} />}
          rightSectionWidth={70}
          rightSection={<Code className={classes.searchCode}>⌘ + K</Code>}
          styles={{ rightSection: { pointerEvents: 'none' } }}
          mb="sm"
          onClick={() => openSpotlight()}
        />
        {links}
        <Modal
          opened={isview}
          onClose={() => setView(false)}
          title="Introduce yourself!"
        >
          {/* Modal content */}
        </Modal>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <User />
      </Navbar.Section>
      <WalletInfo />
    </Navbar>
  );
});
