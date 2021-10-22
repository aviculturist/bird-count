import '../utils/wdyr';
import * as React from 'react';
import { ReactNode, Suspense } from 'react';
import { Provider } from 'jotai';
import { HashRouter } from 'react-router-dom';
import { DarkModeProvider } from 'context/darkmode-context';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';
import { useEffect } from 'react';
import * as plurals from 'make-plural/plurals';
// can't use next/app router until i18n SSG is supported
// import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { userLocaleAtom, DEFAULT_MESSAGES, DEFAULT_LOCALE, Locale } from '@store/user-locale';
import { useActiveLocale, queryLocale, navigatorLocale } from '@hooks/use-active-locale';
import { NoSsr } from '@mui/core';
import { StyleSheetManager } from 'styled-components';
import rtlPlugin from 'stylis-plugin-rtl';
import { StylisPlugin } from 'styled-components';

//
// function DirectionProvider(props) {
//   return <StyleSheetManager stylisPlugins={[rtlPlugin]}>{props.children}</StyleSheetManager>;
// }

// https://dev.to/pffigueiredo/bullet-proof-rtl-rtl-in-a-web-platform-3-6-4bne
// TODO: these props/children ?
function DirectionProvider({ children }: { children: ReactNode }) {
  //function DirectionProvider(props: ) {
  const locale = useActiveLocale();
  // TODO: see if direction detection is available as part of the rtlPlugin instead of hardcoding
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <StyleSheetManager stylisPlugins={dir === 'rtl' ? [rtlPlugin as unknown as StylisPlugin] : []}>
      {children}
      {/* {props.children} */}
    </StyleSheetManager>
  );
}

async function dynamicActivate(queryLocale: Locale | undefined, userLocale: Locale | null) {
  //console.log('within initialDynamicActivate: ' + queryLocale + ' ' + userLocale);

  const locale: Locale = queryLocale ?? userLocale ?? navigatorLocale() ?? DEFAULT_LOCALE;
  i18n.loadLocaleData(locale, { plurals: () => plurals[locale] });
  const { messages } =
    locale === DEFAULT_LOCALE
      ? { messages: DEFAULT_MESSAGES }
      : await import(`@lingui/loader!./../../locale/${locale}.json?raw-lingui`);
  i18n.load(locale, messages);
  i18n.activate(locale);
}

// TODO: is this only run server side?
dynamicActivate(queryLocale ?? navigatorLocale() ?? DEFAULT_LOCALE, null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useActiveLocale();
  //console.log('useActiveLocale reports locale from LanguageProvider: ' + locale);
  const [userLocale, setUserLocale] = useAtom(userLocaleAtom); //useUserLocaleManager()

  useEffect(() => {
    dynamicActivate(locale, userLocale)
      .then(() => {
        document.documentElement.setAttribute('lang', locale);
        const dir = locale === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.setAttribute('dir', dir);
        document.querySelector('body')?.setAttribute('dir', dir);
        setUserLocale(locale); // stores the selected locale to persist across sessions
      })
      .catch(error => {
        console.error('Failed to activate locale', locale, error);
      });
  }, [locale, userLocale, setUserLocale]);

  return (
    <I18nProvider forceRenderOnLocaleChange={true} i18n={i18n}>
      {children}
    </I18nProvider>
  );
}

function BirdCountApp(props: AppProps) {
  const { Component, pageProps } = props;

  // can't use next/app router until i18n SSG is supported
  //const { pathname, query, locale } = useRouter();

  // useEffect(() => {
  //   async function load(locale:string) {
  //     console.log(locale);
  //     i18n.loadLocaleData(locale, { plurals: plurals[locale as keyof typeof plurals] })
  //     const { messages } = await import(`@lingui/loader!./../../locale/${locale}.json?raw-lingui`);
  //     //console.log('within useEffect: ' + locale)
  //     i18n.load(locale, messages);
  //     i18n.activate(locale);
  //     //setUserLocale(locale); // TODO: is this the only reason the app re-renders?
  //   }

  //   load(userLocale);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userLocale]);
  return (
    <Provider>
      <Head>
        <title>BirdCount</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22></text><text text-anchor=%22end%22 y=%221.9em%22 x=%221.9em%22 font-size=%2250%22>15</text></svg>"
        />

        {/* <link href="./favicon.ico" rel="icon" /> */}
        <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
      </Head>
      {/* NoSsr because Nextjs doesn't support i18n SSG and HashRouter will fail server-side with Invariant failed: Hash history needs a DOM*/}
      <NoSsr>
        <HashRouter>
          <LanguageProvider>
            <DirectionProvider>
              <DarkModeProvider>
                <CssBaseline />
                <Component {...pageProps} />
              </DarkModeProvider>
            </DirectionProvider>
          </LanguageProvider>
        </HashRouter>
      </NoSsr>
    </Provider>
  );
}
export default BirdCountApp;
{
  /* <div>
{typeof window === 'undefined' ? null : <Component {...pageProps} />}
</div> */
}
