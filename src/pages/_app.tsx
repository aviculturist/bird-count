import * as React from 'react';
import { Provider } from 'jotai';
import { DarkModeProvider } from '@components/darkmode-context';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';
import { useEffect } from 'react';
import * as plurals from 'make-plural/plurals'
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { userLocaleAtom } from '@store/user-locale';

export default function BirdCountApp(props: AppProps) {
  const { Component, pageProps } = props;
  const { pathname, query, locale } = useRouter();
  const [userLocale, setUserLocale] = useAtom(userLocaleAtom);

  useEffect(() => {
    async function load(locale:string) {
      i18n.loadLocaleData(locale, { plurals: plurals[locale as keyof typeof plurals] })
      const { messages } = await import(`@lingui/loader!./../../locale/${locale}.json?raw-lingui`);
      //console.log('within useEffect: ' + locale)
      i18n.load(locale, messages);
      i18n.activate(locale);
      setUserLocale(locale); // TODO: is this the only reason the app re-renders?
    }

    load(locale || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);
  return (
    <Provider>
      <React.Fragment>
        <Head>
          <title>BirdCount</title>
          <link href="/favicon.ico" rel="icon" />
          <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
        </Head>
        <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
          <DarkModeProvider>
            <CssBaseline />
            <Component {...pageProps} />
          </DarkModeProvider>
        </I18nProvider>
      </React.Fragment>
    </Provider>
  );
}
