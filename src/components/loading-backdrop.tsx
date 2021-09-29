import { useAtom } from 'jotai';
import { loadingAtom } from '@store/loading';
import { LOADING_KEYS } from '@store/loading';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { useAuth } from 'micro-stacks/react';

export default function LoadingBackdrop() {
  const [isWalletPopup, setIsWalletPopup] = useAtom(loadingAtom(LOADING_KEYS.WALLETPOPUP));
  const { isSignedIn, handleSignIn, handleSignOut, isLoading } = useAuth();

  const handleClose = () => {
    //setIsWalletPopup(false) : setIsWalletPopup(true);
    // TODO: close wallet
  };

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={isLoading}
        onClick={handleClose}
      >
        <Stack spacing={2} alignItems="center">
          <CircularProgress color="inherit" />
          <Typography>Connecting Stacks Wallet</Typography>
        </Stack>
      </Backdrop>
    </div>
  );
}
