import { useAtom } from 'jotai';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { pendingTransactionsCountAtom } from '@store/pending-transactions-count';
import ToggleDarkMode from '@components/toggle-darkmode';
import { WalletConnectButton } from '@components/wallet-connect-button';
import { useDrawer } from '@hooks/use-drawer';

export default function MainAppBar(): JSX.Element {
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
          <AddCircleIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            BirdCount
          </Typography>
          <ToggleDarkMode />
          <Button color="inherit" onClick={handleToggleDrawer}>
            <Badge badgeContent={pendingTransactionsCount} color="secondary">
              <VisibilityIcon />
            </Badge>
          </Button>
          <WalletConnectButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
