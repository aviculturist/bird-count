import * as React from 'react';
import { useAtom } from 'jotai';
import LoadingBackdrop from '@components/loading-backdrop';
import BirdCount from '@components/bird-count';
import { GetStaticPropsContext, NextPage } from 'next';
import { GetQueries, getStaticQueryProps, withInitialQueryData } from 'jotai-query-toolkit/nextjs';
import { appProviderAtomBuilder } from 'micro-stacks/react';
import { StacksTestnet, StacksMainnet } from 'micro-stacks/network';
import { Network, currentNetworkAtom } from '@store/networks';
//import { currentNetwork } from '@utils/constants';

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

// const BuildInitialQueryData = () => {
//   const [currentNetwork, setCurrentNetwork] = useAtom(currentNetworkAtom);
//   withInitialQueryData(
//     Index,
//     appProviderAtomBuilder({
//       network: currentNetwork.chain === 'testnet' ? new StacksTestnet({ url: currentNetwork.url }) : new StacksMainnet({ url: currentNetwork.url }), //IS_TESTNET ? new StacksTestnet({ url: apiServer }) : new StacksMainnet({ url: apiServer }),
//       authOptions: {
//         appDetails: {
//           name: 'BirdCount',
//           icon: './stx-favicon.png',
//         },
//       },
//     })
//   )
// }
// export default BuildInitialQueryData;
// TODO: not happy about this implementation of currentNetwork but not sure how else to get state values this early.
// More importantly, how does one enforce a render when the user selects a new url?

export default withInitialQueryData(
  Index,
  appProviderAtomBuilder({
    network: new StacksTestnet({ url: 'http://localhost:3999'} ), //IS_TESTNET ? new StacksTestnet({ url: apiServer }) : new StacksMainnet({ url: apiServer }),
    authOptions: {
      appDetails: {
        name: 'BirdCount',
        icon: './stx-favicon.png',
      },
    },
  })
);
