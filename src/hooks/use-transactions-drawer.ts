import { useAtom } from 'jotai';
import { transactionsDrawerAtom } from '@store/transactions-drawer';

interface Drawer {
  isDrawerVisible: boolean;
  setIsDrawerVisible: (update: any) => void;
}

export function useTransactionsDrawer(): Drawer {
  const [isDrawerVisible, setIsDrawerVisible] = useAtom(transactionsDrawerAtom);
  return { isDrawerVisible, setIsDrawerVisible };
}
