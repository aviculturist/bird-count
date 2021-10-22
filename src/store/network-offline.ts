import { atom } from 'jotai';
import { networkInfoAtom } from '@store/network-info';

export const networkOfflineSnackbarIsDismissedAtom = atom(false);
export const networkOfflineAtom = atom(get =>
  // TODO: a better way to handle network offline
  JSON.stringify(get(networkInfoAtom)) === '{}' ? true : false
);
