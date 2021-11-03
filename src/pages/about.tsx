import * as React from 'react';
import { Suspense } from 'react';
import { NextPage } from 'next';
import { GetQueries, getStaticQueryProps } from 'jotai-query-toolkit/nextjs';
import { wrapWithMicroStacks } from '@micro-stacks/nextjs';
import { StacksMainnet, StacksMocknet } from 'micro-stacks/network';
import {
  DEFAULT_MAINNET_SERVER,
  DEFAULT_REGTEST_SERVER,
  DEFAULT_LOCALNET_SERVER,
  ENV,
} from '@utils/constants';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { t } from '@lingui/macro';
import MainAppBar from '@components/main-appbar';
import MainAppbarDrawer from '@components/main-appbar-drawer';
import Footer from '@components/footer';

const About: NextPage<any> = () => {
  return (
    <>
      <MainAppBar />
      <Container maxWidth="sm">
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              //bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Typography component="h1" variant="h2" align="center" gutterBottom>
              {t`This is the about page.`}
            </Typography>
            <Alert severity="warning">{t`EXTREME ALPHA SOFTWARE: USE AT YOUR OWN RISK`}</Alert>
            <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
              BirdCount
            </Stack>
          </Box>
          <Suspense fallback={<CircularProgress />}>
            <MainAppbarDrawer />
          </Suspense>
        </main>
      </Container>
      <Footer />
    </>
  );
};

// an array of queries for initial data
// TODO: how can we combine initial queries from other sources?,
// spread syntax doesn't work without an iterator.
// TODO: how to take the state from another page instead of
// using the statically built state
const getQueries: GetQueries = _ctx => [
  [
    'network-info', // the query key we're using
    async () => {
      return {
        peer_version: 385875968,
        pox_consensus: '17f76e597bab45646956f38dd39573085d72cbc0',
        burn_block_height: 16,
        stable_pox_consensus: '8e0561978fc5506b68a589c402dad97e862edb59',
        stable_burn_block_height: 15,
        server_version: 'blockstack-core 0.0.1 => 23.0.0.0 (, release build, linux [x86_64])',
        network_id: 2147483648,
        parent_network_id: 3669344250,
        stacks_tip_height: 15,
        stacks_tip: 'b1807a2d3f7f8c7922f7c1d60d7c34145ade05d789640dc7dc9ec1021e07bb54',
        stacks_tip_consensus_hash: '17f76e597bab45646956f38dd39573085d72cbc0',
        unanchored_tip: '0000000000000000000000000000000000000000000000000000000000000000',
        exit_at_block_height: null,
      };
    }, // TODO: our fetcher for the server
  ],
];

// enable SSG
export const getStaticProps = getStaticQueryProps(getQueries)(async _ctx => {
  return { props: {}, revalidate: 60 };
});

// .env.development and .env.production are source of truth for NEXT_PUBLIC_ENV
// in development, default to localnet, in production, mainnet
const initialNetwork =
  ENV === 'development'
    ? new StacksMocknet({ url: DEFAULT_LOCALNET_SERVER })
    : new StacksMainnet({ url: DEFAULT_MAINNET_SERVER });

// TODO: icon needs fqd
const withMicroStacks = wrapWithMicroStacks({
  network: initialNetwork,
  authOptions: {
    appDetails: {
      name: 'BirdCount',
      icon: './stx-favicon.png',
    },
  },
});

export default withMicroStacks(About);
