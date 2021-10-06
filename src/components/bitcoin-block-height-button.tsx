import * as React from 'react';
import { useAtom } from 'jotai';
import { networkInfoAtom } from '@store/network-info';
import { DEFAULT_LOCALNET_SERVER } from '@utils/constants';
import { currentBitcoinExplorerState } from '@store/network-state';
import CircleIcon from '@mui/icons-material/Circle';
import LoadingButton from '@mui/lab/LoadingButton';
import Tooltip from '@mui/material/Tooltip';
import { networkAtom } from 'micro-stacks/react';
import { t } from '@lingui/macro';

export default function BitcoinBlockHeightButton() {
  const [network] = useAtom(networkAtom);
  const [networkInfo] = useAtom(networkInfoAtom);
  const [currentBitcoinExplorer] = useAtom(currentBitcoinExplorerState);
  return (
    <>
      <Tooltip title={t`Bitcoin Block Height`}>
        <LoadingButton
          loading={networkInfo.burn_block_height === undefined}
          loadingPosition="start"
          href={`${currentBitcoinExplorer}/block${
            network.getCoreApiUrl() === DEFAULT_LOCALNET_SERVER ? '-height' : ''
          }/${networkInfo.burn_block_height}`}
          target="_blank"
          startIcon={<CircleIcon />}
          variant="text"
          size="small"
          color="success"
        >
          {networkInfo.burn_block_height}
        </LoadingButton>
      </Tooltip>
    </>
  );
}
