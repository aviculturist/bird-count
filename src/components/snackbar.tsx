import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import { useLoading } from '@hooks/use-loading';
import { LOADING_KEYS } from '@store/loading';

export default function SimpleSnackbar() {
  //const [open, setOpen] = React.useState(false);
  const { isLoading, setIsLoading } = useLoading(LOADING_KEYS.WALLETPOPUP);

  const handleClick = () => {
    setIsLoading(true);
  };

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsLoading(false);
  };

  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CircularProgress />
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={isLoading}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Pending transaction sent"
        action={action}
      />
    </div>
  );
}
