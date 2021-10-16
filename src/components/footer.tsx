import * as React from 'react';
import { Suspense } from 'react';
import { GetStaticPropsContext } from 'next';
import { GetQueries, getStaticQueryProps, withInitialQueryData } from 'jotai-query-toolkit/nextjs';

import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LoadingBackdrop from '@components/loading-backdrop';
import DeleteApplicationDataButton from '@components/clear-application-data-button';
import BitcoinBlockHeightButton from '@components/bitcoin-block-height-button';
import StacksChainTipButton from '@components/stacks-chain-tip-button';
import LocalNetworkOfflineSnackbar from '@components/local-network-offline-snackbar';
import { LocalNetworkOfflineIconButton } from '@components/local-network-offline-snackbar';
import { t } from '@lingui/macro';

function Copyright() {
  const buildHash = process.env.NEXT_PUBLIC_COMMIT_HASH || '';
  const buildHashShort = buildHash.slice(0, 7);
  return (
    <>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
        spacing={1}
        sx={{
          p: 2,
          position: 'absolute',
          bottom: 10,
          left: 10,
        }}
      >
        {' '}
        <LocalNetworkOfflineIconButton />
        <Button
          sx={{ textTransform: 'none' }}
          size="small"
          color="primary"
          variant="text"
          target="_blank"
          href={`https://github.com/aviculturist/bird-count/commit/${buildHash}`}
        >{`${buildHashShort}`}</Button>
        <Button
          size="small"
          color="inherit"
          target="_blank"
          href="https://github.com/aviculturist/bird-count/graphs/contributors"
        >
          {'© '}
          {t`the contributors`} {new Date().getFullYear()}
          <Tooltip title={t`Made with Love`}>
            <FavoriteIcon color="error" fontSize="inherit" />
          </Tooltip>
        </Button>
      </Stack>
    </>
  );
}

export default function Footer() {
  return (
    <>
      {/* Footer */}
      <Box sx={{ p: 6 }} component="footer">
        <Copyright />

        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          spacing={1}
          sx={{
            p: 2,
            position: 'absolute',
            bottom: 10,
            right: 10,
          }}
        >
          <Suspense fallback={<CircularProgress />}>
            <BitcoinBlockHeightButton />
          </Suspense>
          <Suspense fallback={<CircularProgress />}>
            <StacksChainTipButton />
          </Suspense>
          <DeleteApplicationDataButton />
        </Stack>
      </Box>
      {/* End footer */}
      <LoadingBackdrop />
      <LocalNetworkOfflineSnackbar />
    </>
  );
}
