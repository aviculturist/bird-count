import { atom } from 'jotai';
import { BirdCount } from '@store/bird-count';

export const feedItemsAtom = atom<Record<string, BirdCount>>({});
