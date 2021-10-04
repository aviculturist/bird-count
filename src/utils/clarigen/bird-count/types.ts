import { ClarityTypes, Transaction } from '@clarigen/core';

// prettier-ignore
export interface BirdCountContract {
  decrement: () => Transaction<bigint, null>;
  increment: () => Transaction<bigint, null>;
  getCounter: () => Promise<ClarityTypes.Response<bigint, null>>;
}
