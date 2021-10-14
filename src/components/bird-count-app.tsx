import * as React from 'react';
import { Suspense } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import DrawerFeed from '@components/drawer-feed';
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
    </>
  );
}
