import { useAuth } from 'micro-stacks/react';
import Button from '@mui/material/Button';
import { t } from '@lingui/macro';

const WalletConnectButton = () => {
  const { isSignedIn, handleSignIn, handleSignOut, isLoading } = useAuth();
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={isSignedIn ? handleSignOut : handleSignIn}
      >
        {isLoading ? t`Loading...` : isSignedIn ? t`Sign out` : t`Connect Stacks Wallet`}
      </Button>
    </>
  );
};

export default WalletConnectButton;
