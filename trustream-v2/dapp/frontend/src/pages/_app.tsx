import 'reflect-metadata';
import React, { useEffect, useMemo, useState } from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import type { AppProps } from 'next/app';
import superjson from 'superjson';

import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { withTRPC } from '@trpc/next';

import { useStore } from '@/store/index';
import { ETHProvider } from '../components/EthProvider';
import { getLibrary } from '../lib/web3-react';
import { WalletSelecter } from '../components/WalletSelecter/index';
import { AppRouter } from '@/server/routers/_app';
import { MantineProvider, ColorSchemeProvider, ColorScheme, Global } from '@mantine/core';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { helper } from '../lib/helper';
import { NotificationsProvider } from '@mantine/notifications';
import '../i18n/config';
import { smartGraph } from '../lib/smartgraph/index';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import Head from 'next/head';

//Binding events. 
Router.events.on('routeChangeStart', () => {
  NProgress.start()
});

Router.events.on('beforeHistoryChange', () => {
  NProgress.start()
});

Router.events.on('routeChangeComplete', () => {
  NProgress.done()
});

Router.events.on('routeChangeError', () => {
  NProgress.done()
});


function MyApp({ Component, pageProps }: AppProps) {
  const { lang, god, user } = useStore();
  const router = useRouter()
  const store = useLocalObservable(() => ({
    get colorScheme() {
      return user.theme.value || ('dark' as ColorScheme);
    },
    get colors() {
      return user.colors;
    }
  }));

  useEffect(() => {
    lang.init();
    // setInterval(() => {
    //   god.pollingData();
    // }, 15000);
    smartGraph.event.on('provider.newBlock', (chainId, blockNumber) => {
      console.log('new block', chainId, blockNumber);
      if (chainId == god.currentChain.chainId) {
        god.pollingData();
      }
    });
  }, []);

  if (!helper.env.isBrower) {
    return <div></div>;
  }

  const getRouterName = (path) => {
    const links = [
      ['nft', 'NFT - Elumicate Inc'],
      ['viewdata', 'View Mine Data - Elumicate Inc'],
      ['setting', 'Setting - Elumicate Inc'],
    ];
    for (let i = 0; i < links.length; i++) {
      if (path.indexOf(links[i][0]) != -1) {
        return links[i][1];
      }
    }
    return 'Mine Outdoor Data - People Powered World Vision - Elumicate';
  };

  // use useMemo to fix issue https://github.com/vercel/next.js/issues/12010

  // console.log('currentAccount', god.currentNetwork.account);

  return (
    <>
      <Head>
        {/* <title></title> */}
        <title>{getRouterName(router.pathname)}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="https://www.elumicate.com/wp-content/uploads/2022/05/cropped-Elumicate-Icon-for-Installer-32x32.png" sizes="32x32" />
        <link rel="icon" href="https://www.elumicate.com/wp-content/uploads/2022/05/cropped-Elumicate-Icon-for-Installer-192x192.png" sizes="192x192" />
        <link rel="apple-touch-icon" href="https://www.elumicate.com/wp-content/uploads/2022/05/cropped-Elumicate-Icon-for-Installer-180x180.png" />
        <meta name="msapplication-TileImage" content="https://www.elumicate.com/wp-content/uploads/2022/05/cropped-Elumicate-Icon-for-Installer-270x270.png" />
      </Head>
      {/* <ColorSchemeProvider colorScheme={store.colorScheme} toggleColorScheme={user.toggleTheme}> */}
      <MantineProvider
        theme={{
          fontFamily: 'Proxima-Nova-Bold, Proxima-Nova, Oxanium, sans-serif;',
          colors: (store.colors as any),
          colorScheme: store.colorScheme
        }} withGlobalStyles withNormalizeCSS>
        <Global
          styles={(theme) => ({
            '*, *::before, *::after': {
              boxSizing: 'border-box',
            },

            body: {
              ...theme.fn.fontStyles(),
              fontFamily: 'Proxima-Nova-Bold !important',
            },
          })}
        />
        <NotificationsProvider>
          <Web3ReactProvider getLibrary={getLibrary}>
            <WalletSelecter />
            <ETHProvider />

            {/* <Toaster /> */}
            {/* <Header /> */}
            <Component {...pageProps} />
          </Web3ReactProvider>
        </NotificationsProvider>
      </MantineProvider>
      {/* </ColorSchemeProvider> */}
    </>
  );
}
function getBaseUrl() {
  if (process.browser) {
    return '';
  }
  // reference for vercel.com
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // // reference for render.com
  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  }

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export default withTRPC<AppRouter>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    return {
      /**
       * @link https://trpc.io/docs/links
       */
      links: [
        // adds pretty logs to your console in development and logs errors in production
        loggerLink({
          enabled: (opts) => process.env.NODE_ENV === 'development' || (opts.direction === 'down' && opts.result instanceof Error)
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`
        })
      ],
      /**
       * @link https://trpc.io/docs/data-transformers
       */
      transformer: superjson
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
  /**
   * Set headers or status code when doing SSR
   */
  responseMeta({ clientErrors }) {
    if (clientErrors.length) {
      // propagate http first error from API calls
      return {
        status: clientErrors[0].data?.httpStatus ?? 500
      };
    }

    // for app caching with SSR see https://trpc.io/docs/caching

    return {};
  }
})(observer(MyApp));
