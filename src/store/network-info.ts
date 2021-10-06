import { networkAtom } from 'micro-stacks/react';
import { atomWithQuery } from 'jotai-query-toolkit';
import { StacksMainnet } from 'micro-stacks/network';

interface NetworkInfo {
  peer_version: number;
  pox_consensus: string;
  burn_block_height: number;
  stable_pox_consensus: string;
  stable_burn_block_height: number;
  server_version: string;
  network_id: number;
  parent_network_id: string;
  stacks_tip_height: number;
  stacks_tip: string;
  stacks_tip_consensus_hash: string;
  unanchored_tip: string;
  exit_at_block_height: number | null;
}

const DEFAULT_FETCH_OPTIONS: RequestInit = {
  referrer: 'no-referrer',
  referrerPolicy: 'no-referrer',
};

async function fetchPrivate(input: RequestInfo, init: RequestInit = {}): Promise<Response> {
  return fetch(input, { ...DEFAULT_FETCH_OPTIONS, ...init });
}

export const networkInfoAtom = atomWithQuery<NetworkInfo>(
  'network-info',
  async get => {
    const network = get(networkAtom);

    const requestHeaders = {
      Accept: 'application/json',
    };

    const fetchOptions = {
      method: 'GET',
      headers: requestHeaders,
    };

    const defaultNetwork = new StacksMainnet();
    const url = network ? network.getInfoUrl() : defaultNetwork.getInfoUrl();
    const response = await fetchPrivate(url, fetchOptions);
    if (!response.ok) {
      let msg = '';
      try {
        msg = await response.json();
      } catch (error) {}
      throw new Error(
        `Error retrieving info URL. Response ${response.status}: ${response.statusText}. Attempted to fetch ${url} and failed with the message: "${msg}"`
      );
    }
    const networkInfoResult: NetworkInfo = await response.json();
    return networkInfoResult;
  },
  { refetchInterval: 10000 }
); // every minute
