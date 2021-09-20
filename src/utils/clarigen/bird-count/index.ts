import { proxy, BaseProvider, Contract } from '@clarigen/core';
import type { BirdCountContract } from './types';
import { BirdCountInterface } from './abi';
export type { BirdCountContract } from './types';

export const birdCountContract = (provider: BaseProvider) => {
  const contract = proxy<BirdCountContract>(BirdCountInterface, provider);
  return contract;
};

export const birdCountInfo: Contract<BirdCountContract> = {
  contract: birdCountContract,
  address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  contractFile: 'contracts/bird-count.clar',
};
