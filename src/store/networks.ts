import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils'
import { DEFAULT_NETWORK_LIST } from '@utils/constants';

export interface Network {
  index: number;
  name: string;
  label: string;
  chain: string;
  url: string;
}

export const networksAtom = atom<Network[] | undefined>(DEFAULT_NETWORK_LIST );
// defaulting to mainnet, but not sure that's operative here
export const currentNetworkAtom = atomWithStorage<Network>('network', DEFAULT_NETWORK_LIST[0] );
