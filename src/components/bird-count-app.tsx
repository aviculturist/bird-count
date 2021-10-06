import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import DrawerFeed from '@components/drawer-feed';
import BirdCountButtonGroup from '@components/bird-count-buttongroup';
import LoadingBackdrop from '@components/loading-backdrop';
import SimpleSnackbar from '@components/snackbar';
import MainAppBar from '@components/main-appbar';
import Alert from '@mui/material/Alert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
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
          <Tooltip title="Made with Love">
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
            {/* <Container maxWidth="sm"> */}
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
              <BirdCountButtonGroup />
              <SimpleSnackbar />
            </Stack>
            {/* </Container> */}
          </Box>
          <DrawerFeed />
        </main>
      </Container>

      {/* Footer */}
      <Box sx={{ p: 6 }} component="footer">
        {/* <Typography variant="h6" align="center" gutterBottom>
          .
        </Typography>
        <Typography variant="subtitle1" align="center" component="p">
          .
        </Typography> */}
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
          <BitcoinBlockHeightButton />
          <StacksChainTipButton />
        </Stack>
      </Box>
      {/* End footer */}
      <LoadingBackdrop />
    </>
  );
}
