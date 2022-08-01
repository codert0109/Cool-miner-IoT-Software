import React, { useState } from 'react';
import { AppShell, Navbar, Header, Aside, Text, MediaQuery, Burger, useMantineTheme, useMantineColorScheme, Group, ActionIcon, ScrollArea, Box } from '@mantine/core';
import { useStore } from '../../store/index';
import { Sun, MoonStars, Search } from 'tabler-icons-react';
import { observer } from 'mobx-react-lite';
import { NavbarSimple } from './Navbar';
import { SpotlightProvider } from '@mantine/spotlight';
import HeaderNav from '@/components/Header';
import Footer from '@/components/Footer';

export const MainLayout = observer(({ children }: { children?: any }) => {
  const theme = useMantineTheme();
  const { god, user } = useStore();

  return (
    <SpotlightProvider actions={user.actions} searchIcon={<Search size={20} />} searchPlaceholder="Search..." shortcut="mod + k" nothingFoundMessage="Nothing found..." highlightQuery>
      <AppShell
        styles={{
          main: {
            background: 'transparent'
            // background: theme.colorScheme === 'dark' ? 'black' : 'red',
            // black : 'red',
            // white : 'red'
          }
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        fixed
        navbar={god.currentNetwork.account ? <NavbarSimple /> : undefined}
        footer={
          <Footer/>
        }
        header={
          <HeaderNav/>
        }
      >
        {children}
      </AppShell>
    </SpotlightProvider>
  );
});

export default MainLayout;
