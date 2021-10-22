import * as React from 'react';
import { useAtom } from 'jotai';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { networkOfflineSnackbarIsDismissedAtom, networkOfflineAtom } from '@store/network-offline';
import NetworkInfoIcon from '@components/network-info-icon';
import { networkInfoAtom } from '@store/network-info';
import { loadingInfoAtom } from '@store/loading-info';
import { t } from '@lingui/macro';

export default function NetworkStatusIconButton() {
  const [networkOffline] = useAtom(networkOfflineAtom);
  const [, setDismissNetworkOfflineSnackbar] = useAtom(networkOfflineSnackbarIsDismissedAtom);
  const [, dispatchNetworkInfo] = useAtom(networkInfoAtom);
  const [isLoadingInfo, setIsLoadingInfo] = useAtom(loadingInfoAtom);

  const timer = React.useRef<number>();

  // fetch latest data
  const refetch = () => {
    if (!isLoadingInfo) {
      setIsLoadingInfo(true);
      timer.current = window.setTimeout(() => {
        setIsLoadingInfo(false);
      }, 2000);
    }
    dispatchNetworkInfo({ type: 'refetch' });
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setDismissNetworkOfflineSnackbar(false);
  };

  return (
    <Tooltip title={networkOffline ? t`Network Offline` : t`Network Online`}>
      <IconButton
        onClick={() => refetch()}
        size="small"
        color={networkOffline ? 'error' : 'success'}
      >
        <NetworkInfoIcon size={18} left={8} top={8} />
      </IconButton>
    </Tooltip>
  );
}
