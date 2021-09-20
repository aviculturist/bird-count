import { ClarityTypes, Transaction } from '@clarigen/core';

// prettier-ignore
export interface BirdCountContract {
  decrement: () => Transaction<boolean, null>;
  increment: () => Transaction<boolean, null>;
  getCounter: () => Promise<bigint>;
}
