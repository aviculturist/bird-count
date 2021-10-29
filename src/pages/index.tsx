import * as React from 'react';
import { GetStaticPropsContext, NextPage } from 'next';
import { GetQueries, getStaticQueryProps, withInitialQueryData } from 'jotai-query-toolkit/nextjs';
import { buildMicroStacksAtoms } from 'micro-stacks/react';
import { StacksMainnet, StacksMocknet } from 'micro-stacks/network';
import {
  DEFAULT_MAINNET_SERVER,
  DEFAULT_REGTEST_SERVER,
  DEFAULT_LOCALNET_SERVER,
  ENV,
} from '@utils/constants';
import MainAppBar from '@components/main-appbar';
import BirdCountApp from '@components/bird-count-app';
import Footer from '@components/footer';

const Index: NextPage<any> = () => {
  return (
    <>
      <MainAppBar />
      <BirdCountApp />
      <Footer />
    </>
  );
};

// an array of queries for initial data
const getQueries: GetQueries = (_ctx: GetStaticPropsContext) => [
  [
    'bird-count', // the query key we're using
    async () => {
      return 15;
    }, // TODO: our fetcher for the server
  ],
  [
    'pending-txs', // the query key we're using
    async () => {
      return [];
    }, // TODO: our fetcher for the server
  ],
  [
    'recent-txs', // the query key we're using
    async () => {
      return [];
    }, // TODO: our fetcher for the server
  ],
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

//const allQueries = getQueries.concat(getFooterQueries); //[...getFooterQueries, ...getQueries];
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
export default withInitialQueryData(
  Index,
  buildMicroStacksAtoms({
    network: initialNetwork,
    authOptions: {
      appDetails: {
        name: 'BirdCount',
        icon: './stx-favicon.png',
      },
    },
  })
);
