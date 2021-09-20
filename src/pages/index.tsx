import * as React from 'react';
import LoadingBackdrop from '@components/loading-backdrop';
import BirdCount from '@components/bird-count';
import {NextPage, NextPageContext} from 'next';
import {withInitialQueries, GetQueries} from 'jotai-query-toolkit/nextjs';
import {appProviderAtomBuilder} from 'micro-stacks/react';
import {StacksTestnet} from 'micro-stacks/network';


// the queries array
const getQueries: GetQueries = (_ctx: NextPageContext) => [
  [
    'bird-count', // the query key we're using
    async () => {
      return 15;
    }, // TODO: our fetcher for the server
  ],
];

// https://blog.hao.dev/render-client-side-only-component-in-next-js
const Index: NextPage<any> = () => {
  return (
    <>
      <BirdCount/>
      <LoadingBackdrop/>
    </>
  );
};
export default withInitialQueries(Index, appProviderAtomBuilder({
  network: new StacksTestnet({url: 'http://localhost:3999'}),
  authOptions: {
    appDetails: {
      name: 'micro-stacks <> next.js',
      icon: '/icon.png',
    },
  },
}))(getQueries);
