import * as React from 'react';
import { Suspense } from 'react';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import DrawerFeed from '@components/drawer-feed';
import LoadingBackdrop from '@components/loading-backdrop';
import MainAppBar from '@components/main-appbar';
import BirdCountButtonGroup from '@components/bird-count-buttongroup';
import DeleteApplicationDataButton from '@components/delete-application-data-button';
import BitcoinBlockHeightButton from '@components/bitcoin-block-height-button';
import StacksChainTipButton from '@components/stacks-chain-tip-button';
import { t } from '@lingui/macro';

function Copyright() {
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
        </Button>{' '}
      </Stack>
    </>
  );
}

export default function BirdCountApp() {
  return (
    <>
      <MainAppBar />
      <Container maxWidth="sm">
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              //bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Typography
              component="h1"
              variant="h2"
              align="center"
              //color="text.primary"
              gutterBottom
            >
              {t`BirdCount makes it easy to count all the birds`}
            </Typography>
            <Alert severity="warning">{t`EXTREME ALPHA SOFTWARE: USE AT YOUR OWN RISK`}</Alert>
            <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
              <Suspense fallback={<CircularProgress />}>
                <BirdCountButtonGroup />
              </Suspense>
            </Stack>
          </Box>
          <Suspense fallback={<CircularProgress />}>
            <DrawerFeed />
          </Suspense>
        </main>
      </Container>

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
    </>
  );
}