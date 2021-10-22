import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

// A favicon counter based on https://favicon-badge.glitch.me/
const faviconCounterScriptTxt = `
function generateIcon(link, emoji, count) {

  const padding=100/16;

  const svg = document. createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

  //<text y=%22.9em%22 font-size=%2290%22></text>
  //<text text-anchor=%22end%22 y=%221.9em%22 x=%221.9em%22 font-size=%2250%22>10</text>
  const t1 = document. createElementNS("http://www.w3.org/2000/svg", "text");
  t1.setAttribute('y', '.9em');
  t1.setAttribute('font-size', '90');
  t1.textContent = emoji;
  svg.appendChild(t1);

  if (count) {
    const t2 = document. createElementNS("http://www.w3.org/2000/svg", "text");
    t2.setAttribute('x', 100 - padding);
    t2.setAttribute('y', 100 - padding);
    t2.setAttribute('font-size', '60');
    t2.setAttribute('text-anchor', 'end');
    t2.setAttribute('alignment-baseline', 'text-bottom');
    t2.setAttribute('fill', 'white');
    t2.style.font = 'sans';
    t2.style.fontWeight = '400';
    t2.textContent = count;
    svg.appendChild(t2);

    // measure the text
    document.body.appendChild(svg);
    const rect = t2.getBBox();
    document.body.removeChild(svg);

    const r1 = document. createElementNS("http://www.w3.org/2000/svg", "rect");
    r1.setAttribute('x', rect.x);
    r1.setAttribute('y', rect.y);
    r1.setAttribute('width', rect.width + padding);
    r1.setAttribute('height', rect.height + padding);
    r1.setAttribute('rx', padding);
    r1.setAttribute('ry', padding);
    r1.style.fill = 'red';
    svg.appendChild(r1);
    svg.appendChild(t2);
  }

  link.href='data:image/svg+xml,' + svg.outerHTML.replace(/"/ig, '%22');
}
`;
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
          {/* TODO: fix this whole section. PWA primary color */}
          {/* <meta content={colorMode === 'dark' ? `${darkTheme.palette.primary.main}` : `${lightTheme.palette.primary.main}`} name="theme-color" /> */}
          {/* <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            rel="stylesheet"
          /> */}
          <script dangerouslySetInnerHTML={{ __html: scriptTxt }} />
          <script defer dangerouslySetInnerHTML={{ __html: faviconCounterScriptTxt }} />
          <style
            dangerouslySetInnerHTML=
            {{
              __html: `
              #background-radial-gradient {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                pointer-events: none;
                width: 200vw;
                height: 200vh;
                background: radial-gradient(50% 50% at 50% 50%, #42a5f5 0%, rgba(255, 255, 255, 0) 100%);
                transform: translate(-100vw, -100vh);
                z-index: -1;
            }
              `,
            }}
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
                  darkModePreferenceExists = localStorage.getItem("darkMode") === null ? false : true;
                  prefersDarkMode = JSON.parse(localStorage.getItem("darkMode"));
                } catch (err) {}
                setDarkModePref(darkModePreferenceExists ? prefersDarkMode : (darkQuery.matches ? true : false));
              })();
            `,
            }}
          />
          <Main />
          <NextScript />
          <div id="background-radial-gradient"></div>
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
// https://github.com/mui-org/material-ui/tree/next/examples/nextjs-with-styled-components-typescript
// https://github.com/vercel/next.js/blob/master/examples/with-styled-components/pages/_document.js
// See also https://stackoverflow.com/questions/60697385/fix-eslint-warnings-in-next-jss-document-tsx-thrown-by-documentany-and-ctx-r
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
