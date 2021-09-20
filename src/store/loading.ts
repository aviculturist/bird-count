import { atomFamily } from 'jotai/utils';
import { atom } from 'jotai';

export const loadingAtom = atomFamily(key => atom(false));

export enum LOADING_KEYS {
  AUTH = 'loading/AUTH',
  INCREMENT = 'loading/INCREMENT',
}
