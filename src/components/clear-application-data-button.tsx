import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
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
      {/* <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button> */}
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <>
      <Tooltip title={t`Delete in-browser localStorage and sessionStorage`}>
        <IconButton
          color="warning"
          size="small"
          onClick={() => {
            localStorage.clear();
            sessionStorage.clear();
            handleClick();
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} action={action}>
        <Alert severity="success">
          <Trans>localStorage and sessionStorage cleared</Trans>
        </Alert>
      </Snackbar>
    </>
  );
}
export default DeleteApplicationDataButton;
