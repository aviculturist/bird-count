import * as React from 'react';
import { useAtom } from 'jotai';
import { networkAtom } from 'micro-stacks/react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { networkInfoAtom } from '@store/network-info';
import { currentBitcoinExplorerState } from '@store/current-network-state';
import { DEFAULT_LOCALNET_SERVER } from '@utils/constants';
import NetworkInfoIcon from '@components/network-info-icon';
import { t } from '@lingui/macro';

export default function BitcoinBlockHeightButton() {
  const [network] = useAtom(networkAtom);
  const [networkInfo] = useAtom(networkInfoAtom);
  const [currentBitcoinExplorer] = useAtom(currentBitcoinExplorerState);
  return (
    <Tooltip title={t`Bitcoin Block Height`}>
      <Button
        href={
          networkInfo.burn_block_height === undefined
            ? '#'
            : `${currentBitcoinExplorer}/block${
                network.getCoreApiUrl() === DEFAULT_LOCALNET_SERVER ? '-height' : ''
              }/${networkInfo.burn_block_height}`
        }
        target="_blank"
        startIcon={<NetworkInfoIcon left={2} top={5} size={20} icon="bitcoin" />}
        variant="text"
        size="small"
        color={networkInfo.burn_block_height === undefined ? 'error' : 'success'}
      >
        {networkInfo.burn_block_height}
      </Button>
    </Tooltip>
  );
}
