import { useAtom } from 'jotai';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { pendingTransactionsCountAtom } from '@store/pending-transactions-count';
import ToggleDarkModeButton from '@components/toggle-darkmode-button';
import NetworkDialogButton from '@components/network-dialog';
import ToggleDrawerFeedButton from '@components/toggle-drawer-feed-button';
import WalletConnectButton from '@components/wallet-connect-button';
import ChooseLanguageButton from '@components/choose-language-button';

function MainAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative" color="transparent" elevation={0}>
        <Toolbar sx={{ columnGap: 1 }}>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BirdCount
          </Typography>
          <ToggleDarkModeButton />
          <ToggleDrawerFeedButton />
          <NetworkDialogButton />
          <WalletConnectButton />
          <ChooseLanguageButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default MainAppBar;
