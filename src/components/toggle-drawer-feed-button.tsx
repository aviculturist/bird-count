import * as React from 'react';
import { useDrawer } from '@hooks/use-drawer';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import NotificationsNoneTwoToneIcon from '@mui/icons-material/NotificationsNoneTwoTone';
import { pendingTransactionsCountAtom } from '@store/pending-transactions-count';
import { useAtom } from 'jotai';
import { t } from '@lingui/macro';

function ToggleDrawerFeedButton() {
  const { isDrawer, setIsDrawer } = useDrawer();
  const handleToggleDrawer = (event: React.MouseEvent<HTMLElement>) => {
    void setIsDrawer(true);
  };
  const [pendingTransactionsCount, setPendingTransactionsCount] = useAtom(
    pendingTransactionsCountAtom
  );
  return (
    <IconButton onClick={handleToggleDrawer} color="primary" size="small">
      <Badge badgeContent={pendingTransactionsCount} color="secondary">
        <Tooltip title={t`Show BirdCount Transactions`}>
          <NotificationsNoneTwoToneIcon fontSize="small" />
        </Tooltip>
      </Badge>
    </IconButton>
  );
}
export default ToggleDrawerFeedButton;
