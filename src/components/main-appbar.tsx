import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ToggleDarkModeButton from '@components/toggle-darkmode-button';
import SelectNetworkDialogButton from '@components/select-network-dialog-button';
import ToggleTransactionsDrawerButton from '@components/toggle-transactions-drawer-button';
import WalletConnectButton from '@components/wallet-connect-button';
import SettingsButton from '@components/settings-button';
import ChooseLanguageButton from '@components/choose-language-button';
import MainAppbarDrawer from '@components/main-appbar-drawer';
import MainAppbarSearch from '@components/main-appbar-search';
import Autocomplete from '@mui/material/Autocomplete';

function MainAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative" color="transparent" elevation={0}>
        <Toolbar sx={{ columnGap: 1 }}>
          <MainAppbarDrawer />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          🐦 BirdCount
          </Typography>
          <ToggleDarkModeButton />
          <ToggleTransactionsDrawerButton />
          <SelectNetworkDialogButton />
          <WalletConnectButton />
          <SettingsButton />
          <ChooseLanguageButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default MainAppBar;
