import * as React from 'react';
import { useEffect } from 'react';
import LoadingBackdrop from '@components/loading-backdrop';
import BirdCount from '@components/bird-count';
import { NextPageContext } from 'next';
import { withInitialQueries, GetQueries } from 'jotai-query-toolkit/nextjs';
import { useAtom } from 'jotai';
import { isBrowserAtom } from '@utils/constants';
import { appProviderAtomBuilder } from 'micro-stacks/react';
import { useAtomValue } from 'jotai/utils';
import { StacksNetwork } from 'micro-stacks/network';
import { networkAtom } from '@store/network';

const useNetworkAtom = () => {
  return useAtomValue(networkAtom);
};

const atoms = appProviderAtomBuilder({
  network: 'testnet', // TODO useNetworkAtom,
  authOptions: {
    appDetails: {
      name: 'micro-stacks <> next.js',
      icon: '/icon.png',
    },
  },
});

// the queries array
const getQueries: GetQueries = (ctx: NextPageContext) => [
  [
    'bird-count', // the query key we're using
    async () => {
      return 15;
    }, // TODO: our fetcher for the server
  ],
];

// https://blog.hao.dev/render-client-side-only-component-in-next-js
const Index = props => {
  const [isBrowser, setIsBrowser] = useAtom(isBrowserAtom);

  useEffect(() => {
    setIsBrowser(true);
    console.log(`client isbrowser ${isBrowser}`);
  }, [isBrowser, setIsBrowser]);

  if (!isBrowser) {
    console.log(`server isbrowser ${isBrowser}`);
    return 'loading';
  }

  return (
    <>
      <BirdCount />
      <LoadingBackdrop />
    </>
  );
};
export default withInitialQueries(Index, atoms)(getQueries);
