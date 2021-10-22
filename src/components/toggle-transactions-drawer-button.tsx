import * as React from 'react';
import { useAtom } from 'jotai';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import NotificationsNoneTwoToneIcon from '@mui/icons-material/NotificationsNoneTwoTone';
import { pendingTxsCountAtom } from '@store/pending-transactions';
import { useTransactionsDrawer } from '@hooks/use-transactions-drawer';
import { t } from '@lingui/macro';

function ToggleTransactionsDrawerButton() {
  const { isDrawerVisible, setIsDrawerVisible } = useTransactionsDrawer();
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
export default ToggleTransactionsDrawerButton;
