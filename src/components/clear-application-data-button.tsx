import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import { t, Trans } from '@lingui/macro';

function DeleteApplicationDataButton() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <>
      <Tooltip title={t`Clear Browser localStorage and sessionStorage`}>
        <IconButton
          color="secondary"
          size="small"
          onClick={() => {
            localStorage.clear();
            sessionStorage.clear();
            handleClick();
          }}
        >
          <DeleteTwoToneIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} action={action}>
        <Alert severity="success">
          <Trans>Browser localStorage and sessionStorage Cleared</Trans>
        </Alert>
      </Snackbar>
    </>
  );
}
export default DeleteApplicationDataButton;
