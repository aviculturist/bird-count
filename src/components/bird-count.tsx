import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
// import ButtonGroup from '@mui/material/ButtonGroup';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
//import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useConnect } from '@stacks/connect-react';
// import { useUserSession } from '@hooks/use-usersession';
// import { useUser } from '@hooks/use-user';
// import { useLoading } from '@hooks/use-loading';
// import { LOADING_KEYS } from '@store/loading';
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

//const theme = createTheme();

export default function BirdCount(): JSX.Element {
  // const { doOpenAuth } = useConnect();
  // const userSession = useUserSession();
  // const { user, setUser } = useUser();
  // const { isLoading, setIsLoading } = useLoading(LOADING_KEYS.AUTH);
  const { isDrawer, setIsDrawer } = useDrawer();

  // const handleConnect = (event: React.MouseEvent<HTMLElement>) => {
  //   setIsLoading(true);
  //   doOpenAuth();
  // };

  // const handleDisconnect = (event: React.MouseEvent<HTMLElement>) => {
  //   userSession.signUserOut();
  //   void setUser(undefined);
  // };

  // const handleCountBird = (event: React.MouseEvent<HTMLElement>) => {
  //   userSession.signUserOut();
  //   void setUser(undefined);
  // };

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
            {/* {user ? (
              <Button color="inherit" onClick={handleDisconnect}>
                Log Out
              </Button>
            ) : (
              <Button color="inherit" onClick={handleConnect}>
                Sign up / Log in
              </Button>
            )} */}
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

              {/* {user ? (
                <Button variant="contained" onClick={handleCountBird}>
                  Count a bird
                </Button>
              ) : (
                <Button variant="contained" onClick={handleConnect}>
                  Sign up / Log in <BirdCountButtonGroup />
                </Button>
              )} */}
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
