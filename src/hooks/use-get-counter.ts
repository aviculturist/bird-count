import { useAtomValue } from 'jotai/utils';
//import { birdCountAtom } from '@store/count';
import { birdCountAtom } from '@store/bird-count';

export function useGetCounter(): number {
  // const [birdCount, setBirdCount] = useAtom(birdCountAtom);
  // return {  birdCount, setBirdCount };
  return useAtomValue(birdCountAtom);
}
