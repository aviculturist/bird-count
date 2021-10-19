import * as React from 'react';
import { useAtom } from 'jotai';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LaunchIcon from '@mui/icons-material/Launch';
import { currentStacksExplorerState, currentChainState } from '@store/network-state';
import { pendingTxIdsAtom, pendingTxAtom } from '@store/pending-transactions';
import { t } from '@lingui/macro';

function SingleTransactionSnackbar({ txid }: { txid: string }) {
  const [tx, setTx] = useAtom(pendingTxAtom(txid));
  const [explorer] = useAtom(currentStacksExplorerState);
  const [chain] = useAtom(currentChainState);
  const [pendingTxIds, setPendingTxIds] = useAtom(pendingTxIdsAtom);

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    console.log('click from handleClose, will do something here in the future');
  };

  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      key={txid}
      open={tx.isPending === true}
      //autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert action={action} severity="success">
        {txid}
        <IconButton
          target="_blank"
          href={`${explorer}/txid/${txid}?chain=${chain}`}
          aria-label="go"
        >
          <LaunchIcon fontSize="small" />
        </IconButton>
      </Alert>
    </Snackbar>
  );
}

// TODO: not entirely sure if looping through all pending transactions is correct here
export default function TransactionSnackbars() {
  const [pendingTxIds, setPendingTxIds] = useAtom(pendingTxIdsAtom);
  return (
    <div>
      {pendingTxIds.map(item => (
        <SingleTransactionSnackbar key={item} txid={item} />
      ))}
    </div>
  );
}
