const withTM = require('next-transpile-modules')(['@mui/material', '@mui/system']); // pass the modules you would like to see transpiled

module.exports = withTM({
  // https://github.com/Velenir/nextjs-ipfs-example/
  assetPrefix: './',
  trailingSlash: true,
  reactStrictMode: true,
  // env: {
  //   SC_ATTR: 'bc',
  // },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@mui/styled-engine': '@mui/styled-engine-sc',
    };
    return config;
  },
});
