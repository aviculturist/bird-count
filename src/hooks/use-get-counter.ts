import { useAtomValue } from 'jotai/utils';
import { birdCountAtom } from '@store/bird-count';

export function useGetCounter(): number {
  return useAtomValue(birdCountAtom);
}
