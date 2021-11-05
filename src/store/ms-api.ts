import { DEFAULT_NETWORK_LIST } from '@utils/constants';
import { currentNetworkAtom, Network } from '@store/current-network-state';
import { CoreNodeInfoResponse, ServerStatusResponse } from '@stacks/stacks-blockchain-api-types';
import { fetchCoreApiInfo, fetchStatus } from 'micro-stacks/api';
import { atomFamilyWithQuery } from 'jotai-query-toolkit';

const networks: Network[] = DEFAULT_NETWORK_LIST;

export const anyNetworkStatusAtom = atomFamilyWithQuery<string, ServerStatusResponse>(
  'search-results',
  async (get, networkName) => {
    // find the network index
    const network = networks.find(function (net) {
      return net['name'] === networkName;
    }) || { url: '' };
    const networkUrl = network.url || '';
    //const networkUrl = get(networkAtom).getCoreApiUrl();
    try {
      const res = await fetchStatus({ url: networkUrl });
      return res;
    } catch (_e) {
      console.log(_e);
    }
    return {} as ServerStatusResponse;

    // const requestHeaders = {
    //   Accept: 'application/json',
    // };

    // const fetchOptions = {
    //   method: 'GET',
    //   headers: requestHeaders,
    // };

    // const url = `${networkUrl}/extended/v1/search/${query}`;
    // try {
    //   const response = await fetchPrivate(url, fetchOptions);
    //   const searchResult: ServerStatusResponse = await response.json();
    //   return searchResult;
    // } catch (_e) {
    //   console.log(_e);
    // }
    // return {} as ServerStatusResponse;
  },
  { refetchInterval: 10000 }
); // every minute
