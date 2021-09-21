import * as React from 'react';
import {Provider} from 'jotai';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledComponentsTheme } from 'styled-components';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@styles/theme';
import { lightTheme, darkTheme, scTheme } from '@styles/sc-theme';
import type {AppProps} from 'next/app';
import Head from 'next/head';

export default function BirdCountApp(props: AppProps) {
  const {Component, pageProps} = props;
  return (
    <Provider>
      <React.Fragment>
        <Head>
          <title>Next App</title>
          <link href="/favicon.ico" rel="icon"/>
          <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport"/>
        </Head>
        <ThemeProvider theme={theme}>
          <StyledComponentsTheme theme={darkTheme}>
            <CssBaseline />
        <Component {...pageProps} />
        </StyledComponentsTheme>
        </ThemeProvider>
      </React.Fragment>
    </Provider>
  );
}
