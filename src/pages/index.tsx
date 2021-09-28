import * as React from 'react';
import LoadingBackdrop from '@components/loading-backdrop';
import BirdCount from '@components/bird-count';
import { GetStaticPropsContext, NextPage } from 'next';
import { GetQueries, getStaticQueryProps, withInitialQueryData } from 'jotai-query-toolkit/nextjs';
import { appProviderAtomBuilder } from 'micro-stacks/react';
import { StacksMainnet } from 'micro-stacks/network';
import { DEFAULT_MAINNET_SERVER } from '@utils/constants';
//import { ErrorBoundary } from '@components/error-boundry';

// https://blog.hao.dev/render-client-side-only-component-in-next-js
const Index: NextPage<any> = () => {
  return (
    <>
      <BirdCount />
      <LoadingBackdrop />
    </>
  );
};

// the queries array
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
];

// enforce SSG mode
export const getStaticProps = getStaticQueryProps(getQueries)(async _ctx => {
  return { props: {}, revalidate: 60 };
});

export default withInitialQueryData(
  Index,
  appProviderAtomBuilder({
    network: new StacksMainnet({ url: DEFAULT_MAINNET_SERVER }),
    authOptions: {
      appDetails: {
        name: 'BirdCount',
        icon: './stx-favicon.png',
      },
    },
  })
);
