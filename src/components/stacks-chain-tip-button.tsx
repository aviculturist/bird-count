import * as React from 'react';
import { useAtom } from 'jotai';
import { networkInfoAtom } from '@store/network-info';
import { currentStacksExplorerState, currentChainState } from '@store/network-state';
import CircleIcon from '@mui/icons-material/Circle';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { t } from '@lingui/macro';

export default function StacksChainTipButton() {
  const [networkInfo] = useAtom(networkInfoAtom);
  const [currentStacksExplorer] = useAtom(currentStacksExplorerState);
  const [currentChain] = useAtom(currentChainState);

  return (
    <>
      <Tooltip title={t`Stacks Chain Tip`}>
        <LoadingButton
          //loading={networkInfo.stacks_tip === undefined}
          //loadingPosition="start"
          href={
            networkInfo.stacks_tip === undefined
              ? '#'
              : `${currentStacksExplorer}/block/${networkInfo.stacks_tip}?chain=${currentChain}`
          }
          target="_blank"
          startIcon={<CircleIcon />}
          variant="text"
          size="small"
          color={networkInfo.stacks_tip === undefined ? 'error' : 'success'}
        >
          {networkInfo.stacks_tip_height}
        </LoadingButton>
      </Tooltip>
    </>
  );
}
