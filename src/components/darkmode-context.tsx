import React, { useState, useEffect, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

const DarkModeContext = React.createContext(false);

export function DarkModeProvider({ children }): JSX.Element {
  const [darkMode, setDarkMode] = useState(global.window?.__prefersDarkMode || false);

  // TODO: recall why I don't need this bit
  // const colorMode = React.useMemo(
  //   () => ({
  //     toggleColorMode: () => {
  //       toggleDarkMode(); //setDarkMode(!darkMode);
  //     },
  //   }),
  //   []
  // );

  const getColorMode = (dmode: boolean) => ({
    palette: {
      mode: dmode === true ? ('dark' as PaletteMode) : ('light' as PaletteMode),
    },
  });

  // Update the theme only if darkMode changes
  const theme = React.useMemo(() => createTheme(getColorMode(darkMode)), [darkMode]);

  const toggleDarkMode = () => {
    global.window.__setPrefersDarkMode(darkMode === true ? false : true);
  };

  useEffect(() => {
    global.window.__onPrefChange = setDarkMode;
  }, []);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </DarkModeContext.Provider>
  );
}

export const useDarkModeContext = () => useContext(DarkModeContext);
