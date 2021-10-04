import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import DrawerFeed from '@components/drawer-feed';
import BirdCountButtonGroup from '@components/bird-count-buttongroup';
import SimpleSnackbar from '@components/snackbar';
import MainAppBar from '@components/main-appbar';
import Alert from '@mui/material/Alert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Tooltip } from '@mui/material';
import { t } from '@lingui/macro';

function Copyright() {
  return (
    <>
      <Typography variant="body2" align="center">
        {'© '}
        <Link
          color="inherit"
          target="_blank"
          href="https://github.com/aviculturist/bird-count/graphs/contributors"
        >
          the contributors
        </Link>{' '}
        {new Date().getFullYear()}
        <Tooltip title="Made with Love">
          <FavoriteIcon fontSize="inherit" />
        </Tooltip>
      </Typography>
    </>
  );
}

export default function BirdCount() {
  return (
    <>
      <MainAppBar />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            //bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              //color="text.primary"
              gutterBottom
            >
              {t`BirdCount makes it easy to count all the birds`}
            </Typography>
            <Alert severity="warning">EXTREME ALPHA SOFTWARE: USE AT YOUR OWN RISK</Alert>
            <Typography variant="h5" align="center" paragraph>
              .
            </Typography>
            <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
              <BirdCountButtonGroup />
              <SimpleSnackbar />
            </Stack>
          </Container>
        </Box>
        <DrawerFeed />
      </main>
      {/* Footer */}
      <Box sx={{ p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          .
        </Typography>
        <Typography variant="subtitle1" align="center" component="p">
          .{' '}
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </>
  );
}
