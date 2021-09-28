import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

//https://github.com/Velenir/nextjs-ipfs-example/
const scriptTxt = `
(function () {
  const { pathname } = window.location
  const ipfsMatch = /.*\\/Qm\\w{44}\\//.exec(pathname)
  const base = document.createElement('base')

  base.href = ipfsMatch ? ipfsMatch[0] : '/'
  document.head.append(base)
})();
`;

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* PWA primary color */}
          {/* <meta content={colorMode === 'dark' ? `${darkTheme.palette.primary.main}` : `${lightTheme.palette.primary.main}`} name="theme-color" /> */}
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            rel="stylesheet"
          />
          <script dangerouslySetInnerHTML={{ __html: scriptTxt }} />
        </Head>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function () {
                function setDarkModePref(newPref) {
                  document.body.className = newPref === true ? "dark" : "light";
                  window.__prefersDarkMode = newPref;
                  window.__onPrefChange(newPref);
                }
                window.__onPrefChange = function () {};
                window.__setPrefersDarkMode = function (newPref) {
                  setDarkModePref(newPref);
                  try {
                    localStorage.setItem("darkMode", window.__prefersDarkMode);
                  } catch (err) {}
                };
                const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
                darkQuery.addListener(function (event) {
                  window.__setPrefersDarkMode(event.matches ? true : false);
                });
                let prefersDarkMode;
                try {
                  prefersDarkMode = JSON.parse(localStorage.getItem("darkMode"));
                } catch (err) {}
                setDarkModePref(prefersDarkMode || (darkQuery.matches ? true : false));
              })();
            `,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
// https://github.com/vercel/next.js/blob/master/examples/with-styled-components/pages/_document.js
MyDocument.getInitialProps = async ctx => {
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        // eslint-disable-next-line react/display-name
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
      });
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    };
  } finally {
    sheet.seal();
  }
};
