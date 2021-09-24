import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionCache from '@utils/create-emotion-cache';
import createEmotionServer from '@emotion/server/create-instance';

// https://material-ui.com/styles/advanced/#next-js
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
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) => (props) => <App emotionCache={cache} {...props} />,
    });

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
  };
};
