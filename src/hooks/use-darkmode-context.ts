import * as React from 'react';
import { useContext } from 'react';
import { DarkModeContext, DarkModeContextInterface } from 'context/darkmode-context';

export const useDarkModeContext = (): DarkModeContextInterface => useContext(DarkModeContext);
