import * as React from 'react';
import LightModeTwoToneIcon from '@mui/icons-material/LightModeTwoTone';
import ModeNightTwoToneIcon from '@mui/icons-material/ModeNightTwoTone';
import IconButton from '@mui/material/IconButton';
import NoSsr from '@mui/core/NoSsr';
import Tooltip from '@mui/material/Tooltip';
import { yellow, grey } from '@mui/material/colors';
import { useDarkModeContext } from '@components/darkmode-context';
import { t } from '@lingui/macro';

function ToggleDarkModeButton() {
  const { darkMode, toggleDarkMode } = useDarkModeContext();

  return (
    <NoSsr>
      <IconButton onClick={toggleDarkMode} size="small" color="inherit">
        {darkMode === true ? (
          <Tooltip title={t`Turn off Dark Mode`}>
            <LightModeTwoToneIcon
              sx={{
                color: yellow[500],
              }}
              fontSize="small"
            />
          </Tooltip>
        ) : (
          <Tooltip title={t`Turn on Dark Mode`}>
            <ModeNightTwoToneIcon
              sx={{
                color: grey[900],
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
