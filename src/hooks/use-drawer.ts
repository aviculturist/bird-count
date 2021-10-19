import { useAtom } from 'jotai';
import { drawerAtom } from '@store/drawer';

interface Drawer {
  isDrawerVisible: boolean;
  setIsDrawerVisible: (update: any) => void;
}

export function useDrawer(): Drawer {
  const [isDrawerVisible, setIsDrawerVisible] = useAtom(drawerAtom);
  return { isDrawerVisible, setIsDrawerVisible };
}
