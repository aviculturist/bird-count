import {
  DEFAULT_NETWORK_LIST,
  DEFAULT_MAINNET_SERVER,
  DEFAULT_TESTNET_SERVER,
  DEFAULT_LOCALNET_SERVER,
  DEFAULT_MAINNET_EXPLORER,
  DEFAULT_TESTNET_EXPLORER,
  DEFAULT_LOCALNET_EXPLORER,
  DEFAULT_MAINNET_BIRDCOUNT_CONTRACT,
  DEFAULT_TESTNET_BIRDCOUNT_CONTRACT,
  DEFAULT_LOCALNET_BIRDCOUNT_CONTRACT,
} from '@utils/constants';
import { useNetwork, currentNetworkName } from 'micro-stacks/react';
import { useAtomValue } from 'jotai/utils';

export const GetCurrentBirdcountContract = () => {
  const { network } = useNetwork();
  const birdCountContract =
    network.coreApiUrl === DEFAULT_LOCALNET_SERVER
      ? DEFAULT_LOCALNET_BIRDCOUNT_CONTRACT
      : network.coreApiUrl === DEFAULT_TESTNET_SERVER
      ? DEFAULT_TESTNET_BIRDCOUNT_CONTRACT
      : DEFAULT_MAINNET_BIRDCOUNT_CONTRACT;
  return { birdCountContract };
  //const networkName = network.coreApiUrl === HIRO_MAINNET_DEFAULT ? "Mainnet"
};

export const GetCurrentExplorer = () => {
  const { network } = useNetwork();
  const defaultExplorer =
    network.coreApiUrl === DEFAULT_LOCALNET_SERVER
      ? DEFAULT_LOCALNET_EXPLORER
      : network.coreApiUrl === DEFAULT_TESTNET_SERVER
      ? DEFAULT_TESTNET_EXPLORER
      : DEFAULT_MAINNET_EXPLORER;
  return { defaultExplorer };
};
//BIRDCOUNT_CONTRACT;
//DEFAULT_EXPLORER;
