import * as React from 'react';
import { useAtom } from 'jotai';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { networkOfflineSnackbarIsDismissedAtom } from '@store/network-offline-snackbar-is-dismissed';
import { networkIsOfflineAtom } from '@store/network-is-offline';
import NetworkInfoIcon from '@components/network-info-icon';
import { networkInfoAtom } from '@store/network-info';
import { networkInfoIsLoadingAtom } from '@store/network-info-is-loading';
import { t } from '@lingui/macro';

export default function NetworkStatusIconButton() {
  const [networkOffline] = useAtom(networkIsOfflineAtom);
  const [, setDismissNetworkOfflineSnackbar] = useAtom(networkOfflineSnackbarIsDismissedAtom);
  const [, dispatchNetworkInfo] = useAtom(networkInfoAtom);
  const [isLoadingInfo, setIsLoadingInfo] = useAtom(networkInfoIsLoadingAtom);

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
