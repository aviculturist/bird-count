import { useAtomValue } from 'jotai/utils';
import { networkAtom } from '@store/network';
import { StacksNetwork } from '@stacks/network';

export function useNetwork(): StacksNetwork | undefined {
  return useAtomValue(networkAtom);
}
