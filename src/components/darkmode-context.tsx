import React, { ReactNode, useState, useEffect, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import { useAtom } from 'jotai';
import { darkModeAtom } from '@store/darkmode';

export interface DarkModeContextInterface {
  darkMode?: any;
  toggleDarkMode?: any;
}
// https://fettblog.eu/typescript-react/context/
const DarkModeContext = React.createContext<Partial<DarkModeContextInterface>>({});

// https://newbedev.com/how-to-fix-binding-element-children-implicitly-has-an-any-type-ts-7031
interface Props {
  children: ReactNode;
}

// https://stackoverflow.com/questions/56457935/typescript-error-property-x-does-not-exist-on-type-window
declare global {
  interface Window {
    __prefersDarkMode: any;
    __setPrefersDarkMode: any;
    __onPrefChange: any;
  }
}

export function DarkModeProvider({ children }: { children: ReactNode }) {
  // TODO: footer gets the correct theme, but the main body doesn't
  //const [darkMode, setDarkMode] = useState(global.window?.__prefersDarkMode || false);
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const getColorMode = (dmode: boolean) => ({
    palette: {
      mode: dmode === true ? ('dark' as PaletteMode) : ('light' as PaletteMode),
    },
  });

  // Update the theme only if darkMode changes
  const theme = React.useMemo(() => createTheme(getColorMode(darkMode as boolean)), [darkMode]);

  const toggleDarkMode = () => {
    global.window.__setPrefersDarkMode(darkMode === true ? false : true);
  };

  useEffect(() => {
    global.window.__onPrefChange = setDarkMode;
  }, [setDarkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode } as DarkModeContextInterface}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </DarkModeContext.Provider>
  );
}

export const useDarkModeContext = (): DarkModeContextInterface => useContext(DarkModeContext);
