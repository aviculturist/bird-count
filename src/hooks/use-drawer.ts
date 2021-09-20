import { useAtom } from 'jotai';
import { drawerAtom } from '@store/drawer';

interface Drawer {
  isDrawer: boolean;
  setIsDrawer: (update: any) => void;
}

export function useDrawer(): Drawer {
  const [isDrawer, setIsDrawer] = useAtom(drawerAtom);
  return { isDrawer, setIsDrawer };
}
