import * as React from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useDarkModeContext } from '@components/darkmode-context';
import IconButton from '@mui/material/IconButton';
import NoSsr from '@mui/core/NoSsr';
import Tooltip from '@mui/material/Tooltip';
import { grey } from '@mui/material/colors';
import { t } from '@lingui/macro';

function ToggleDarkModeButton() {
  const { darkMode, toggleDarkMode } = useDarkModeContext();

  return (
    <NoSsr>
      <IconButton onClick={toggleDarkMode} color="inherit">
        {darkMode === true ? (
          <Tooltip title={t`Turn off Dark Mode`}>
            <Brightness4Icon
              sx={{
                color: grey[500],
              }}
              fontSize="small"
            />
          </Tooltip>
        ) : (
          <Tooltip title={t`Turn on Dark Mode`}>
            <Brightness7Icon
              sx={{
                color: grey[500],
              }}
              fontSize="small"
            />
          </Tooltip>
        )}
      </IconButton>
    </NoSsr>
  );
}

export default ToggleDarkModeButton;
