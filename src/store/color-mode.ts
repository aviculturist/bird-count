import { atomWithStorage } from 'jotai/utils'
import React from 'react';

export const colorModeAtom = atomWithStorage('darkMode', true);

//export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
