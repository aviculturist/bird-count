import * as React from 'react';
import { Suspense } from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import TransactionsDrawer from '@components/transactions-drawer';
import BirdCountButtonGroup from '@components/bird-count-buttongroup';
import { t } from '@lingui/macro';

export default function BirdCountApp() {
  return (
    <>
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
            <Stack sx={{ pt: 4 }} direction="column" spacing={2} justifyContent="center">
              <Alert severity="warning">
                <AlertTitle>{t`EXTREME ALPHA SOFTWARE: USE AT YOUR OWN RISK`}</AlertTitle>
                {t`This project has not been audited.`}
              </Alert>
              <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
                <Suspense fallback={<CircularProgress />}>
                  <BirdCountButtonGroup />
                </Suspense>
              </Stack>
              <Alert severity="info">
                <AlertTitle>Core Values</AlertTitle>
                {t`BirdCount is a starter app that "can't be evil".`}{' '}
                <strong>
                  <a rel="noreferrer" target="_blank" href="https://github.com/aviculturist/bird-count#--birdcount">Learn more.</a>
                </strong>
              </Alert>
            </Stack>
          </Box>
          <Suspense fallback={<CircularProgress />}>
            <TransactionsDrawer />
          </Suspense>
        </main>
      </Container>
    </>
  );
}
