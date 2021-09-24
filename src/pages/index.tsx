import * as React from 'react';
import LoadingBackdrop from '@components/loading-backdrop';
import BirdCount from '@components/bird-count';
import { NextPage, NextPageContext } from 'next';
import { withInitialQueries, GetQueries } from 'jotai-query-toolkit/nextjs';
import { appProviderAtomBuilder } from 'micro-stacks/react';
import { StacksTestnet } from 'micro-stacks/network';
import { GetStaticProps } from 'next';

// enforce SSG mode
//export const getStaticProps: GetStaticProps = async (ctx) => { return { props: { }, revalidate: 60 }; }

// the queries array
const getQueries: GetQueries = (_ctx: NextPageContext) => [
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

// https://blog.hao.dev/render-client-side-only-component-in-next-js
const Index: NextPage<any> = () => {
  return (
    <>
      <BirdCount />
      <LoadingBackdrop />
    </>
  );
};
export default withInitialQueries(
  Index,
  appProviderAtomBuilder({
    network: new StacksTestnet({ url: 'http://localhost:3999' }),
    authOptions: {
      appDetails: {
        name: 'BirdCount',
        icon: '/stx-favicon.png',
      },
    },
  })
)(getQueries);
