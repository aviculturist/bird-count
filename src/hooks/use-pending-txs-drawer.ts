import { useAtom } from 'jotai';
import { pendingTxsDrawerAtom } from '@store/pending-txs-drawer';

interface Drawer {
  isDrawerVisible: boolean;
  setIsDrawerVisible: (update: any) => void;
}

export function usePendingTxsDrawer(): Drawer {
  const [isDrawerVisible, setIsDrawerVisible] = useAtom(pendingTxsDrawerAtom);
  return { isDrawerVisible, setIsDrawerVisible };
}
