import * as React from 'react';
import { useAuth } from 'micro-stacks/react';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { t } from '@lingui/macro';

export default function LoadingBackdrop() {
  const { isLoading } = useAuth();

  const handleClose = () => {
    // TODO: close wallet?
  };

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
      open={isLoading}
      onClick={handleClose}
    >
      <Stack spacing={2} alignItems="center">
        <CircularProgress color="inherit" />
        <Typography>{t`Connecting to Stacks Wallet`}</Typography>
      </Stack>
    </Backdrop>
  );
}
