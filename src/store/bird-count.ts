import { atom } from 'jotai';
import { accountsClientAtom, smartContractsClientAtom, transactionsClientAtom } from '@store/api';
import { BIRDCOUNT_CONTRACT, COUNT_FUNCTION } from '@utils/constants';
import { cvToHex, cvToJSON, cvToString, hexToCV, uintCV } from '@stacks/transactions';

import { atomWithQuery } from 'jotai-query-toolkit';

export const birdCountAtom = atomWithQuery<number, string>('bird-count', async get => {
  const client = get(smartContractsClientAtom);
  const [contractAddress, contractName] = BIRDCOUNT_CONTRACT.split('.');
  const data = await client.callReadOnlyFunction({
    contractAddress,
    contractName,
    functionName: COUNT_FUNCTION,
    readOnlyFunctionArgs: {
      sender: contractAddress,
      arguments: [],
    },
  });
  if (data.okay && data.result) {
    const result = cvToJSON(hexToCV(data.result as string)); // TODO
    console.log(result.value);
    return result.value; //`bar ${count} (client rendered via node, updates every 3 seconds)`;
  } // TODO: failed to fetch
  return 0; //`bar ${count} (client rendered, updates every 3 seconds)`;
});
