import {smartContractsClientAtom} from '@store/api';
import {BIRDCOUNT_CONTRACT, COUNT_FUNCTION} from '@utils/constants';
import {cvToJSON, hexToCV} from '@stacks/transactions';
import {atomWithQuery} from 'jotai-query-toolkit';

export const birdCountAtom = atomWithQuery<number>('bird-count', async get => {
  const client = get(smartContractsClientAtom);
  const [contractAddress, contractName] = BIRDCOUNT_CONTRACT.split('.');
  try {
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
      return result.value;
    } // TODO: failed to fetch
  } catch (_e) {}
  return 0;
});
