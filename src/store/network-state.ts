import { atom } from 'jotai';
import { networkAtom } from 'micro-stacks/react';
import { atomWithStorage } from 'jotai/utils';

export interface Network {
  index: number;
  name: string;
  label: string;
  chain: string;
  url: string;
}

import {
  DEFAULT_NETWORK_LIST,
  DEFAULT_NETWORK_INDEX,
  DEFAULT_MAINNET_SERVER,
  DEFAULT_TESTNET_SERVER,
  DEFAULT_REGTEST_SERVER,
  DEFAULT_LOCALNET_SERVER,
  DEFAULT_MAINNET_EXPLORER,
  DEFAULT_TESTNET_EXPLORER,
  DEFAULT_REGTEST_EXPLORER,
  DEFAULT_LOCALNET_EXPLORER,
  DEFAULT_MAINNET_BIRDCOUNT_CONTRACT,
  DEFAULT_REGTEST_BIRDCOUNT_CONTRACT,
  DEFAULT_TESTNET_BIRDCOUNT_CONTRACT,
  DEFAULT_LOCALNET_BIRDCOUNT_CONTRACT,
  DEFAULT_LOCALNET_BITCOIN_EXPLORER,
  DEFAULT_TESTNET_BITCOIN_EXPLORER,
  DEFAULT_MAINNET_BITCOIN_EXPLORER
} from '@utils/constants';

export const currentBirdcountContractState = atom(get => {
  const network = get(networkAtom);
  const birdCountContract =
    network.getCoreApiUrl() === DEFAULT_LOCALNET_SERVER
      ? DEFAULT_LOCALNET_BIRDCOUNT_CONTRACT
      : network.getCoreApiUrl() === DEFAULT_REGTEST_SERVER
      ? DEFAULT_REGTEST_BIRDCOUNT_CONTRACT
      : network.getCoreApiUrl() === DEFAULT_TESTNET_SERVER
      ? DEFAULT_TESTNET_BIRDCOUNT_CONTRACT
      : DEFAULT_MAINNET_BIRDCOUNT_CONTRACT;
  return birdCountContract;
});

export const currentExplorerState = atom(get => {
  const network = get(networkAtom);
  const defaultExplorer =
    network.getCoreApiUrl() === DEFAULT_LOCALNET_SERVER
      ? DEFAULT_LOCALNET_EXPLORER
      : network.getCoreApiUrl() === DEFAULT_REGTEST_SERVER
      ? DEFAULT_REGTEST_EXPLORER
      : network.getCoreApiUrl() === DEFAULT_TESTNET_SERVER
      ? DEFAULT_TESTNET_EXPLORER
      : DEFAULT_MAINNET_EXPLORER;
  return defaultExplorer;
});

export const currentBitcoinExplorerState = atom(get => {
  const network = get(networkAtom);
  const defaultBitcoinExplorer =
    network.getCoreApiUrl() === DEFAULT_LOCALNET_SERVER
      ? DEFAULT_LOCALNET_BITCOIN_EXPLORER
      : network.getCoreApiUrl() === DEFAULT_REGTEST_SERVER
      ? ''
      : network.getCoreApiUrl() === DEFAULT_TESTNET_SERVER
      ? DEFAULT_TESTNET_BITCOIN_EXPLORER
      : DEFAULT_MAINNET_BITCOIN_EXPLORER;
  return defaultBitcoinExplorer;
});

export const currentChainState = atom(get => {
  const network = get(networkAtom);
  const defaultChain = network.getCoreApiUrl() === DEFAULT_MAINNET_SERVER ? 'mainnet' : 'testnet';
  return defaultChain;
});

// defaulting to mainnet, but not sure that's operative here
export const currentNetworkAtom = atomWithStorage<Network>(
  'network',
  DEFAULT_NETWORK_LIST[DEFAULT_NETWORK_INDEX]
);
