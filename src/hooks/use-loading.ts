import { useAtom } from 'jotai';
import { loadingAtom } from '@store/loading';

interface Loading {
  isLoading: boolean;
  setIsLoading: (update: any) => void;
}

export function useLoading(key: string): Loading {
  const [isLoading, setIsLoading] = useAtom(loadingAtom(key));
  return { isLoading, setIsLoading };
}
