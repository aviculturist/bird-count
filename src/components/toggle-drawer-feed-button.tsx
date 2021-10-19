import * as React from 'react';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import NotificationsNoneTwoToneIcon from '@mui/icons-material/NotificationsNoneTwoTone';
import { pendingTxsCountAtom } from '@store/pending-transactions';
import { useAtom } from 'jotai';
import { t } from '@lingui/macro';
import { usePendingTxsDrawer } from '@hooks/use-pending-txs-drawer';

function ToggleDrawerFeedButton() {
  const { isDrawerVisible, setIsDrawerVisible } = usePendingTxsDrawer();
  const handleToggleDrawer = (event: React.MouseEvent<HTMLElement>) => {
    void setIsDrawerVisible(true);
  };
  const [pendingTxsCount] = useAtom(pendingTxsCountAtom);
  return (
    <IconButton onClick={handleToggleDrawer} color="primary" size="small">
      <Badge badgeContent={pendingTxsCount} color="secondary">
        <Tooltip title={t`Pending Transactions`}>
          <NotificationsNoneTwoToneIcon fontSize="small" />
        </Tooltip>
      </Badge>
    </IconButton>
  );
}
export default ToggleDrawerFeedButton;
