import { useAuth } from 'micro-stacks/react';
import Button from '@mui/material/Button';

export const WalletConnectButton = () => {
  const { isSignedIn, handleSignIn, handleSignOut, isLoading } = useAuth();
  return (
    <Button color="inherit" onClick={isSignedIn ? handleSignOut : handleSignIn}>
      {isLoading ? 'Loading...' : isSignedIn ? 'Sign out' : 'Connect Stacks Wallet'}
    </Button>
  );
};
