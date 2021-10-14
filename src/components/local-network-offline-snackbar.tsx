import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import FiberManualRecordTwoToneIcon from '@mui/icons-material/FiberManualRecordTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import {
  dismissLocalNetworkOfflineSnackbarAtom,
  localNetworkOfflineAtom,
} from '@store/local-network-offline';
import { useAtom } from 'jotai';
import Tooltip from '@mui/material/Tooltip';
import { t } from '@lingui/macro';
import Alert from '@mui/material/Alert';

export function LocalNetworkOfflineIconButton() {
  const [networkOffline] = useAtom(localNetworkOfflineAtom);
  const [, setDismissNetworkOfflineSnackbar] = useAtom(dismissLocalNetworkOfflineSnackbarAtom);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setDismissNetworkOfflineSnackbar(false);
  };

  return (
    <Tooltip title={networkOffline ? t`Network Offline` : t`Network Online`}>
      <IconButton onClick={handleClick} size="small">
        <FiberManualRecordTwoToneIcon
          color={networkOffline ? 'error' : 'success'}
          fontSize="small"
        />
      </IconButton>
    </Tooltip>
  );
}

export default function LocalNetworkOfflineSnackbar() {
  const [networkOffline] = useAtom(localNetworkOfflineAtom);
  const [dismissNetworkOfflineSnackbar, setDismissNetworkOfflineSnackbar] = useAtom(
    dismissLocalNetworkOfflineSnackbarAtom
  );

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setDismissNetworkOfflineSnackbar(true);
  };

  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={networkOffline && dismissNetworkOfflineSnackbar === false}
      autoHideDuration={60000}
      onClose={handleClose}
    >
      <Alert action={action} severity="error">
        Local Network Offline!
      </Alert>
    </Snackbar>
  );
}
