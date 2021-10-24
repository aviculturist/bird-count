import { networkAtom } from 'micro-stacks/react';
import { SearchErrorResult, SearchSuccessResult } from '@stacks/stacks-blockchain-api-types';
import { atomWithQuery, atomFamilyWithQuery } from 'jotai-query-toolkit';
import { atom } from 'jotai';

export const queryAtom = atom('');

export interface ResultType {
  icon?: string;
  slug?: string;
  primary_description: string;
  secondary_description: string;
  timestamp?: number;
}

export const searchQueryAtom = atom('');
export const searchResultAtom = atom<SearchErrorResult | SearchSuccessResult | undefined>(
  undefined
);
export const searchHistoryAtom = atom<{ [key: string]: ResultType }>({});
export const searchFavoritesAtom = atom<{ [key: string]: ResultType }>({});

// interface Item {
//   name: string;
//   price: number;
// }

// interface Items {
//   [key: any]: Item;
// }

// let items: Items = {
//   "34433ded" : {name: "foo", price: 0.99},
//   "14d433dee" : {name: "bar", price: 1.99},
// }

// alert(JSON.stringify(items));

const DEFAULT_FETCH_OPTIONS: RequestInit = {
  referrer: 'no-referrer',
  referrerPolicy: 'no-referrer',
};

async function fetchPrivate(input: RequestInfo, init: RequestInit = {}): Promise<Response> {
  return fetch(input, { ...DEFAULT_FETCH_OPTIONS, ...init });
}

export const searchResultsAtomWithQuery = atomWithQuery<SearchErrorResult | SearchSuccessResult>(
  'search-results',
  async get => {
    const networkUrl = get(networkAtom).getCoreApiUrl();
    const query = get(queryAtom); //'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';

    const requestHeaders = {
      Accept: 'application/json',
    };

    const fetchOptions = {
      method: 'GET',
      headers: requestHeaders,
    };

    const url = `${networkUrl}/extended/v1/search/${query}`;
    try {
      const response = await fetchPrivate(url, fetchOptions);
      const searchResult: SearchErrorResult | SearchSuccessResult = await response.json();
      return searchResult;
    } catch (_e) {
      console.log(_e);
    }
    return {} as SearchErrorResult | SearchSuccessResult;
  },
  { refetchInterval: 10000 }
); // every minute

export const searchResultsAtom = atomFamilyWithQuery<
  string,
  SearchErrorResult | SearchSuccessResult
>(
  'search-results',
  async (get, query) => {
    const networkUrl = get(networkAtom).getCoreApiUrl();
    //const query = get(queryAtom); //'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';

    const requestHeaders = {
      Accept: 'application/json',
    };

    const fetchOptions = {
      method: 'GET',
      headers: requestHeaders,
    };

    const url = `${networkUrl}/extended/v1/search/${query}`;
    try {
      const response = await fetchPrivate(url, fetchOptions);
      const searchResult: SearchErrorResult | SearchSuccessResult = await response.json();
      return searchResult;
    } catch (_e) {
      console.log(_e);
    }
    return {} as SearchErrorResult | SearchSuccessResult;
  },
  { refetchInterval: 10000 }
); // every minute
