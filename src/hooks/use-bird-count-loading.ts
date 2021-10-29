import { useAtom } from 'jotai';
import { birdcountIsLoadingAtom } from '@store/bird-count-is-loading';

interface BirdcountLoadingType {
  birdcountIsLoading: boolean;
  setBirdcountIsLoading: (update: any) => void;
}

export function useBirdcountLoading(): BirdcountLoadingType {
  const [birdcountIsLoading, setBirdcountIsLoading] = useAtom(birdcountIsLoadingAtom);
  return { birdcountIsLoading, setBirdcountIsLoading };
}
