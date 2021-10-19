import * as React from 'react';
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
import AutorenewIcon from '@mui/icons-material/Autorenew';
import LaunchIcon from '@mui/icons-material/Launch';
import { usePendingTxsDrawer } from '@hooks/use-pending-txs-drawer';
import { pendingTxIdsAtom, pendingTxAtom, UserTransaction } from '@store/pending-transactions';
import { toRelativeTime } from '@utils/time';
import { currentStacksExplorerState, currentChainState } from '@store/network-state';
import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import { t } from '@lingui/macro';

// combines the initial queued transaction info
// and the eventually acknowledged mempool info
export interface UserTransactionDrawerView {
  txid: string;
  isPending: boolean;
  sender: string;
  function: string;
  timestamp: number;
}

export function PendingTxItem({ txid }) {
  const [explorer] = useAtom(currentStacksExplorerState);
  const [chain] = useAtom(currentChainState);
  const [pendingTxIds, setPendingTxIds] = useAtom(pendingTxIdsAtom);
  const ptx = useAtomValue(pendingTxAtom(txid));
  // TODO: will eventually merge UserTransaction and UserTransactionDrawerView
  // this is just a mockup for now
  const tx = { ...ptx, sender: 'sender', function: 'function', timestamp: 123 };

  return (
    <ListItem button key={tx.txid}>
      <ListItemIcon>
        <Tooltip key={tx.txid} title={tx.sender}>
          {tx.isPending ? <AutorenewIcon /> : <CheckCircleOutlineIcon color="success" />}
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

export default function PendingTxsDrawer() {
  const { isDrawerVisible, setIsDrawerVisible } = usePendingTxsDrawer();
  const [explorer] = useAtom(currentStacksExplorerState);
  const [chain] = useAtom(currentChainState);
  const [pendingTxIds, setPendingTxIds] = useAtom(pendingTxIdsAtom);

  const ptxs = pendingTxIds;

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setIsDrawerVisible(open);
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
      <Drawer anchor="right" open={isDrawerVisible} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}
