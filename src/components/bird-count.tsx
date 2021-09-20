import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

import { useDrawer } from '@hooks/use-drawer';
import DrawerFeed from '@components/drawer-feed';
import BirdCountButtonGroup from '@components/bird-count-buttongroup';
import { WalletConnectButton } from '@components/wallet-connect-button';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        foobar
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



export default function BirdCount(): JSX.Element {

  const { isDrawer, setIsDrawer } = useDrawer();

  const handleToggleDrawer = (event: React.MouseEvent<HTMLElement>) => {
    void setIsDrawer(true);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="relative">
          <Toolbar>
            <AddCircleIcon sx={{ mr: 2 }} />
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              BirdCount
            </Typography>
            <Button color="inherit" onClick={handleToggleDrawer}>
              <Badge badgeContent={100} color="secondary">
                <VisibilityIcon />
              </Badge>
            </Button>
            <WalletConnectButton />
          </Toolbar>
        </AppBar>
      </Box>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              BirdCount makes it easy to count all the birds
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              .
            </Typography>
            <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
              <WalletConnectButton />
              <BirdCountButtonGroup />
            </Stack>
          </Container>
        </Box>
        <DrawerFeed />
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          This is the gutterBottom.
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          This is above the Copyright!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </>
  );
}
