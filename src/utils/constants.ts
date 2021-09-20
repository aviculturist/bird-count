import { atom } from 'jotai';

export const BIRDCOUNT_CONTRACT = process.env.NEXT_PUBLIC_BIRDCOUNT_CONTRACT || '';
export const COUNT_FUNCTION = 'get-counter';
export const INCREMENT_FUNCTION = 'increment';
export const isBrowserAtom = atom(false);
