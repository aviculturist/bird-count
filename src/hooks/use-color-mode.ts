import { useAtom } from 'jotai';
import { colorModeAtom } from '@store/color-mode';

export function useColorMode() {
  const [colorMode, setColorMode] = useAtom(colorModeAtom);
  return { colorMode, setColorMode };
}
