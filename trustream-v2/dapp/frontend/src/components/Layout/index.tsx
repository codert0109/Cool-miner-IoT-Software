import React, { useState } from 'react';
import { AppShell } from '@mantine/core';
import { useStore } from '../../store/index';
import { Sun, MoonStars, Search } from 'tabler-icons-react';
import { observer } from 'mobx-react-lite';
import { NavbarSimple } from './Navbar';
import { SpotlightProvider } from '@mantine/spotlight';
import HeaderNav from '@/components/Header';
import Footer from '@/components/Footer';
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  rootDiv: {
    backgroundImage: 'url("/images/background.svg")',
    backgroundSize: 'initial',
    backgroundRepeat: 'repeat',
    backgroundColor : (theme.colorScheme == 'dark' ? 'rgb(120, 120, 120)' : 'rgb(255, 255, 255')
  }
}));

export const MainLayout = observer(({ children }: { children?: any }) => {
  const { classes, theme } = useStyles();
  const { god, user } = useStore();

  let mainStyle = {};

  if (theme.colorScheme == 'dark') {
    mainStyle = {
      backgroundImage: 'linear-gradient(to bottom, rgba(107,107,107,0), rgba(0,0,0,255))'
    }
  } else {
    mainStyle = {
      backgroundImage: 'linear-gradient(to bottom, rgba(107,107,107,0), rgba(80,80,80,255))',
    }
  }

  return (
    <SpotlightProvider
      actions={user.actions}
      searchIcon={<Search size={20} />}
      searchPlaceholder="Search..."
      shortcut="mod + k"
      nothingFoundMessage="Nothing found..."
      highlightQuery>
      <div className={classes.rootDiv}>
        <AppShell
          styles={{
            // main: {
              // backgroundImage: 'linear-gradient(to bottom, rgba(107,107,107,0), rgba(0,0,0,255))'
            // }
            main : mainStyle
          }}
          className={classes.rootDiv}
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          fixed
          navbar={god.currentNetwork.account ? <NavbarSimple /> : undefined}
          footer={
            <Footer />
          }
          header={
            <HeaderNav />
          }
        >
          {children}
        </AppShell>
      </div>

    </SpotlightProvider>
  );
});

export default MainLayout;
