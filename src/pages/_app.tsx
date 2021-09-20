import * as React from 'react';
import {Provider} from 'jotai';
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
        <Component {...pageProps} />
      </React.Fragment>
    </Provider>
  );
}
