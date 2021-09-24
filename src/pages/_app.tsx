import * as React from 'react';
import { Provider } from 'jotai';
import { DarkModeProvider } from '@components/darkmode-context';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import createEmotionCache from '@utils/create-emotion-cache';
import { CacheProvider, EmotionCache } from '@emotion/react';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
export default function BirdCountApp(props: MyAppProps): JSX.Element {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <Provider>
      <React.Fragment>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>BirdCount</title>
            <link href="/favicon.ico" rel="icon" />
            <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
          </Head>
          <DarkModeProvider>
            <CssBaseline />
            <Component {...pageProps} />
          </DarkModeProvider>
        </CacheProvider>
      </React.Fragment>
    </Provider>
  );
}
