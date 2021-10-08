import { atom } from 'jotai';
export const pendingTransactionsCountAtom = atom(0);

export const currentPendingTransactionsCountState = atom(
  get => get(pendingTransactionsCountAtom),
  async (_get, set, newValue: number) => {
    set(pendingTransactionsCountAtom, newValue);
  }
);
