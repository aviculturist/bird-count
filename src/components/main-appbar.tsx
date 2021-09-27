import { useAtom } from 'jotai';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { pendingTransactionsCountAtom } from '@store/pending-transactions-count';
import ToggleDarkMode from '@components/toggle-darkmode';
import { WalletConnectButton } from '@components/wallet-connect-button';
import { useDrawer } from '@hooks/use-drawer';
import NetworkDialog from '@components/network-dialog';

function MainAppBar(): JSX.Element {
  const { isDrawer, setIsDrawer } = useDrawer();
  const handleToggleDrawer = (event: React.MouseEvent<HTMLElement>) => {
    void setIsDrawer(true);
  };
  const [pendingTransactionsCount, setPendingTransactionsCount] = useAtom(
    pendingTransactionsCountAtom
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative">
        <Toolbar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BirdCount
          </Typography>
          <ToggleDarkMode />
          <Button color="inherit" onClick={handleToggleDrawer}>
            <Badge badgeContent={pendingTransactionsCount} color="secondary">
              <VisibilityIcon />
            </Badge>
          </Button>
          <NetworkDialog />
          <WalletConnectButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default MainAppBar;
