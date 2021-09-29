import React from 'react';
import { useDrawer } from '@hooks/use-drawer';
import { Badge, IconButton, Tooltip } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { pendingTransactionsCountAtom } from '@store/pending-transactions-count';
import { useAtom } from 'jotai';

function ToggleDrawerFeedButton() {
  const { isDrawer, setIsDrawer } = useDrawer();
  const handleToggleDrawer = (event: React.MouseEvent<HTMLElement>) => {
    void setIsDrawer(true);
  };
  const [pendingTransactionsCount, setPendingTransactionsCount] = useAtom(
    pendingTransactionsCountAtom
  );
  return (
    <IconButton onClick={handleToggleDrawer} color="inherit">
      <Badge badgeContent={pendingTransactionsCount} color="secondary">
        <Tooltip title="Show BirdCount Transaction Feed">
          <NotificationsIcon fontSize="small" />
        </Tooltip>
      </Badge>
    </IconButton>
  );
}
export default ToggleDrawerFeedButton;
