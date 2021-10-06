import * as React from 'react';
import BirdCountApp from '@components/bird-count-app';
import { GetStaticPropsContext, NextPage } from 'next';
import { GetQueries, getStaticQueryProps, withInitialQueryData } from 'jotai-query-toolkit/nextjs';
import { appProviderAtomBuilder } from 'micro-stacks/react';
import { StacksMainnet, StacksMocknet, StacksRegtest } from 'micro-stacks/network';
import {
  DEFAULT_MAINNET_SERVER,
  DEFAULT_REGTEST_SERVER,
  DEFAULT_LOCALNET_SERVER,
  ENV,
} from '@utils/constants';

const Index: NextPage<any> = () => {
  return (
    <>
      <BirdCountApp />
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
      return {};
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
export default withInitialQueryData(
  Index,
  appProviderAtomBuilder({
    network: initialNetwork,
    authOptions: {
      appDetails: {
        name: 'BirdCount',
        icon: './stx-favicon.png',
      },
    },
  })
);
