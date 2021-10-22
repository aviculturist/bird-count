import * as React from 'react';
import { Suspense } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LoadingBackdrop from '@components/loading-backdrop';
import BitcoinBlockHeightButton from '@components/bitcoin-block-height-button';
import StacksChainTipButton from '@components/stacks-chain-tip-button';
import NetworkOfflineSnackbar from '@components/network-offline-snackbar';
import NetworkStatusIconButton from '@components/network-status-iconbutton';
import { GITHUB_URL } from '@utils/constants';
import { t } from '@lingui/macro';

export default function Footer() {
  const buildHash = process.env.NEXT_PUBLIC_COMMIT_HASH || '';
  const buildHashShort = buildHash.slice(0, 7);
  return (
    <AppBar position="fixed" color="transparent" elevation={0} sx={{ top: 'auto', bottom: 0 }}>
      {/* Footer */}
      <Toolbar>
        <NetworkStatusIconButton />
        <Button
          sx={{ textTransform: 'none' }}
          size="small"
          color="secondary"
          variant="text"
          target="_blank"
          href={`${GITHUB_URL}/commit/${buildHash}`}
        >{`${buildHashShort}`}</Button>
        <Button
          size="small"
          color="inherit"
          target="_blank"
          href={`${GITHUB_URL}/graphs/contributors`}
        >
          {'© '}
          {t`contributors`}
          <Tooltip title={t`Made with Love`}>
            <FavoriteIcon sx={{ ml: 1 }} color="error" fontSize="inherit" />
          </Tooltip>
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Suspense fallback={<CircularProgress />}>
          <BitcoinBlockHeightButton />
        </Suspense>
        <Suspense fallback={<CircularProgress />}>
          <StacksChainTipButton />
        </Suspense>
      </Toolbar>
      {/* End footer */}
      <LoadingBackdrop />
      <NetworkOfflineSnackbar />
    </AppBar>
  );
}
