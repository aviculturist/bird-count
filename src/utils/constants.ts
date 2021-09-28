import { Network } from '@store/networks';

export const IS_DEV = process.env.NODE_ENV !== 'production';
export const IS_BROWSER = typeof document !== 'undefined';

export const DEFAULT_MAINNET_SERVER = process.env.NEXT_PUBLIC_MAINNET_API_SERVER || '';
export const DEFAULT_TESTNET_SERVER = process.env.NEXT_PUBLIC_TESTNET_API_SERVER || '';
export const DEFAULT_LOCALNET_SERVER = process.env.NEXT_PUBLIC_LOCALNET_API_SERVER || '';

export const DEFAULT_MAINNET_EXPLORER = process.env.NEXT_PUBLIC_MAINNET_EXPLORER || '';
export const DEFAULT_TESTNET_EXPLORER = process.env.NEXT_PUBLIC_TESTNET_EXPLORER || '';
export const DEFAULT_LOCALNET_EXPLORER = process.env.NEXT_PUBLIC_LOCALNET_EXPLORER || '';

export const DEFAULT_MAINNET_BIRDCOUNT_CONTRACT =
  process.env.NEXT_PUBLIC_MAINNET_BIRDCOUNT_CONTRACT || '';
export const DEFAULT_TESTNET_BIRDCOUNT_CONTRACT =
  process.env.NEXT_PUBLIC_TESTNET_BIRDCOUNT_CONTRACT || '';
export const DEFAULT_LOCALNET_BIRDCOUNT_CONTRACT =
  process.env.NEXT_PUBLIC_LOCALNET_BIRDCOUNT_CONTRACT || '';

export const COUNT_FUNCTION = process.env.NEXT_PUBLIC_COUNT_FUNCTION || '';
export const INCREMENT_FUNCTION = process.env.NEXT_PUBLIC_INCREMENT_FUNCTION || '';
export const DECREMENT_FUNCTION = process.env.NEXT_PUBLIC_DECREMENT_FUNCTION || '';

export const DEFAULT_NETWORK_LIST = [
  {
    index: 0,
    name: 'mainnet',
    label: 'stacks.co',
    chain: 'mainnet',
    url: DEFAULT_MAINNET_SERVER,
  },
  {
    index: 1,
    name: 'testnet',
    label: 'stacks.co',
    chain: 'testnet',
    url: DEFAULT_TESTNET_SERVER,
  },
  {
    index: 2,
    name: 'localnet',
    label: 'localhost',
    chain: 'testnet',
    url: DEFAULT_LOCALNET_SERVER,
  },
];

// In the browser, check for localStorage value, default to mainnet
// On the server, default to mainnet
export const currentNetwork = IS_BROWSER
  ? (JSON.parse(
      localStorage.getItem('network') || JSON.stringify(DEFAULT_NETWORK_LIST[0])
    ) as Network)
  : DEFAULT_NETWORK_LIST[0];

export const DEFAULT_CHAIN = currentNetwork.chain;
