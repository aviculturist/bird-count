import * as React from 'react';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import LaunchIcon from '@mui/icons-material/Launch';
import { useTransactionsDrawerIsOpen } from '@hooks/use-transactions-drawer-is-open';
import { pendingTxIdsAtom, pendingTxAtom } from '@store/pending-transactions';
import { currentStacksExplorerState, currentChainState } from '@store/current-network-state';
import { toRelativeTime } from '@utils/time';
import { t } from '@lingui/macro';

export function PendingTxItem({ txid }: { txid: string }) {
  const [explorer] = useAtom(currentStacksExplorerState);
  const [chain] = useAtom(currentChainState);
  const [pendingTxIds, setPendingTxIds] = useAtom(pendingTxIdsAtom);
  const tx = useAtomValue(pendingTxAtom(txid));

  useEffect(() => {
    if (tx.txstatus === 'success') {
      const txs = pendingTxIds.filter(item => item !== txid);
      setPendingTxIds(txs); // remove from array
      pendingTxAtom.remove(txid); // remove from queries
      console.log('Removing: ' + txid);
    }
  });

  // TODO: This can fire before the transaction has been received by the node
  // is there a way to know if this is the first init?
  // const TxComponent = ({txid}) => {
  //   const txData = useAtomValue(txQueryFamily(txid));
  //   const placeholderTxData = useAtomValue(placeholderTxData(rawTx));
  //   if(!txData) return <PlaceholderTx data={placeholderTxData} />
  //   return <TxDataComponent data={txData} />
  // }

  return (
    <ListItem button key={tx.txid}>
      <ListItemIcon>
        <Tooltip key={tx.txid} title={tx.txstatus}>
          {tx.txstatus === 'success' ? (
            <CheckCircleOutlineIcon color="success" />
          ) : tx.txstatus === 'submitted' || tx.txstatus === 'pending' ? (
            <ChangeCircleOutlinedIcon color="info" />
          ) : tx.txstatus === 'aborted' || tx.txstatus === 'dropped' ? (
            <CancelOutlinedIcon color="error" />
          ) : (
            <HelpOutlineOutlinedIcon color="error" />
          )}
        </Tooltip>
      </ListItemIcon>
      <Tooltip key={tx.txid} title={tx.txid}>
        <ListItemText
          primary={
            <React.Fragment>
              {tx.function}{' '}
              <IconButton
                target="_blank"
                href={`${explorer}/txid/${tx.txid}?chain=${chain}`}
                aria-label="go"
              >
                <LaunchIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
          secondary={<React.Fragment>{toRelativeTime(tx.timestamp * 1000)}</React.Fragment>}
        />
      </Tooltip>
    </ListItem>
  );
}

export default function TransactionsDrawer() {
  const { transactionsDrawerIsOpen, setTransactionsDrawerIsOpen } = useTransactionsDrawerIsOpen();
  const [pendingTxIds] = useAtom(pendingTxIdsAtom);

  const ptxs = pendingTxIds;

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setTransactionsDrawerIsOpen(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        subheader={<ListSubheader>{t`Transactions`}</ListSubheader>}
      >
        {ptxs.map(txid => (
          <PendingTxItem key={txid} txid={txid} />
        ))}
      </List>
      <Pagination count={10} siblingCount={0} boundaryCount={0} />
    </Box>
  );

  return (
    <div>
      <Drawer anchor="right" open={transactionsDrawerIsOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}
