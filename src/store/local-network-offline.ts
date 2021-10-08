import { atom } from 'jotai';
import { networkInfoAtom } from '@store/network-info';

export const dismissLocalNetworkOfflineSnackbarAtom = atom(false);
export const localNetworkOfflineAtom = atom(get =>
  JSON.stringify(get(networkInfoAtom)) === '{}' ? true : false
);
