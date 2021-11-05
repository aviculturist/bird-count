import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ToggleDarkModeIconButton from '@components/toggle-darkmode-iconbutton';
import ToggleTransactionsDrawerIconButton from '@components/toggle-transactions-drawer-iconbutton';
import ToggleSelectNetworkDialogButton from '@components/toggle-select-network-dialog-button';
import ToggleSearchDialogButton from '@components/toggle-search-dialog-button';
import WalletConnectButton from '@components/wallet-connect-button';
import SettingsButton from '@components/settings-button';
import ChooseLanguageButton from '@components/choose-language-button';
import MainAppbarDrawer from '@components/main-appbar-drawer';
import SafeSuspense from '@components/safe-suspense';
import CircularProgress from '@mui/material/CircularProgress';

function MainAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative" color="transparent" elevation={0}>
        <Toolbar sx={{ columnGap: 1 }}>
          <MainAppbarDrawer />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            🐦 BirdCount
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <ToggleDarkModeIconButton />
          <ToggleSearchDialogButton />
          <ToggleSelectNetworkDialogButton />
          <WalletConnectButton />
          <ToggleTransactionsDrawerIconButton />
          <SafeSuspense fallback={<CircularProgress />}>
            <SettingsButton />
          </SafeSuspense>
          <ChooseLanguageButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default MainAppBar;
