import * as React from 'react';
import { useContext } from 'react';
import { useAtom } from 'jotai';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useDrawer } from '@hooks/use-drawer';
import DrawerFeed from '@components/drawer-feed';
import BirdCountButtonGroup from '@components/bird-count-buttongroup';
import { WalletConnectButton } from '@components/wallet-connect-button';
import SimpleSnackbar from '@components/snackbar';
import { pendingTransactionsCountAtom } from '@store/pending-transactions-count';
//import { ColorModeContext } from '@store/color-mode';
//import { colorModeAtom } from '@store/color-mode';
import { ClientOnly } from '@components/client-only';
import ToggleDarkMode from "@components/toggle-darkmode";

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
  const [pendingTransactionsCount, setPendingTransactionsCount] = useAtom(
    pendingTransactionsCountAtom
  );

  //const colorMode = useContext(ColorModeContext);
  //const [darkMode, setDarkMode] = useAtom(colorModeAtom);

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
            <ToggleDarkMode />
            {/* <ClientOnly>
              <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                {darkMode === true ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </ClientOnly> */}

            <Button color="inherit" onClick={handleToggleDrawer}>
              <Badge badgeContent={pendingTransactionsCount} color="secondary">
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
              <BirdCountButtonGroup />
              <SimpleSnackbar />
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
