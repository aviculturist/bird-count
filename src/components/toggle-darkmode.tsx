import React from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useDarkModeContext } from '@components/darkmode-context';
import IconButton from '@mui/material/IconButton';
import NoSsr from '@mui/core/NoSsr';

function ToggleDarkMode(): JSX.Element {
  const { darkMode, toggleDarkMode } = useDarkModeContext();

  return (
    <NoSsr>
      <IconButton onClick={toggleDarkMode} color="inherit">
        {darkMode === true ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    </NoSsr>
  );
}

export default ToggleDarkMode;
