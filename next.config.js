const withTM = require('next-transpile-modules')(['@mui/material', '@mui/system']); // pass the modules you would like to see transpiled

// Disabled until SSG supported
// const linguiConfig = require('./lingui.config.js')
// const { locales, sourceLocale } = linguiConfig

module.exports = withTM({
  // https://github.com/Velenir/nextjs-ipfs-example/
  assetPrefix: './',
  trailingSlash: true,
  reactStrictMode: true,
  // env: {
  //   SC_ATTR: 'bc',
  // },

  webpack: config => {
    config.module.rules = [
      ...config.module.rules,
      {
        resourceQuery: /raw-lingui/,
        type: 'javascript/auto',
      },
    ];
    config.resolve.alias = {
      ...config.resolve.alias,
      '@mui/styled-engine': '@mui/styled-engine-sc',
    };
    return config;
  },
  // Disabled until SSG supported
  // i18n: {
  //   localeDetection: false,
  //   locales,
  //   defaultLocale: sourceLocale,
  // },
});
