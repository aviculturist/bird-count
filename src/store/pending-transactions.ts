import { atom, useAtom } from 'jotai';
import { atomFamilyWithQuery } from 'jotai-query-toolkit';
import { networkAtom } from 'micro-stacks/react';
import type { MempoolTransaction, Transaction } from '@stacks/stacks-blockchain-api-types';

// a simple array of pending transaction ids
export const pendingTxIdsAtom = atom(Array<string>());

// a derived atom that returns the number of pending transaction ids in the array
export const pendingTxsCountAtom = atom(get => {
  const ptxa = get(pendingTxIdsAtom);
  return ptxa.length;
});

// TODO: seems to be the wrong way to remove from this array
const RemovePendingTxId = (txid: string) => {
  const [pendingTxIds, setPendingTxIds] = useAtom(pendingTxIdsAtom);
  const txs = pendingTxIds.filter(item => item !== txid);
  setPendingTxIds(txs);
};

const DEFAULT_FETCH_OPTIONS: RequestInit = {
  referrer: 'no-referrer',
  referrerPolicy: 'no-referrer',
};

async function fetchPrivate(input: RequestInfo, init: RequestInit = {}): Promise<Response> {
  return fetch(input, { ...DEFAULT_FETCH_OPTIONS, ...init });
}

export interface UserTransaction {
  txid: string;
  isPending: boolean;
}

// An atomFamilyWithQuery for a specific transaction id
// TODO: is there a way to loop through this for the queries?
// if so, could make the above array derived atom instead.
export const pendingTxAtom = atomFamilyWithQuery<string, UserTransaction>(
  'pending-tx',
  async (get, txid) => {
    const networkUrl = get(networkAtom).getCoreApiUrl();
    const requestHeaders = {
      Accept: 'application/json',
    };

    const fetchOptions = {
      method: 'GET',
      headers: requestHeaders,
    };

    const url = `${networkUrl}/extended/v1/tx/0x${txid}`;

    // TODO: This can fire before the transaction has been received by the node
    // is there a way to know if this is the first init?
    try {
      const res = await fetchPrivate(url, fetchOptions);
      const tx: Transaction | MempoolTransaction | { error: string } = await res.json();

      // TODO: wrongly assumes this is before tx was received, but there could be other errors
      // such as a network change
      if ('error' in tx) {
        return { txid, isPending: true } as UserTransaction;
      }
      // TODO: how to deal with removing from both array and query?
      if (tx.tx_status === 'success') {
        // remove transactions that aren't pending
        // TODO: wrong way to do it
        //const txs = pendingTxIds.filter(item => item !== txid);
        //setPendingTxIds(txs); // breaks rules
        RemovePendingTxId(txid); // :(
        pendingTxAtom.remove(txid); // no longer pending, remove from family (but it's still listed in the array)
        console.log('Removing: ' + txid); // TODO: This never prints to the log
      }
      return { txid, isPending: tx.tx_status === 'pending' ? true : false };
    } catch (_e) {
      // getting an Invalid Hook Call here
      console.log(_e);
    }
    // TODO: When there's an error, does this even return?
    return { txid, isPending: true } as UserTransaction;
  },
  { refetchInterval: 30000 }
); // every minute
