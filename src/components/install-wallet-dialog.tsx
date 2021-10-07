import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { installWalletDialogAtom } from '@store/install-wallet-dialog';
import { useAtom } from 'jotai';
import WalletImage from '@components/wallet-image';

export default function InstallWalletDialog() {
  const [open, setOpen] = useAtom(installWalletDialogAtom);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog fullWidth={true} maxWidth="xs" onClose={handleClose} open={open}>
      <Card variant="outlined" sx={{ p: 3 }}>
        <DialogTitle>Hiro Wallet Browser Extension</DialogTitle>
        <Grid container spacing={6}>
          <Grid item xs={6} sx={{ gap: 2 }}>
            <WalletImage />
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ pb: 3 }}>
              To get started with BirdCount you need to install and connect a web wallet.
            </Typography>
            <Button
              endIcon={<ExitToAppIcon />}
              variant="contained"
              color="primary"
              size="large"
              href="https://www.hiro.so/wallet/install-web"
              target="_blank"
            >
              Install
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Dialog>
  );
}
