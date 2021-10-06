import * as React from 'react';
import { useAtom } from 'jotai';
import { networkInfoAtom } from '@store/network-info';
import { currentExplorerState, currentChainState } from '@store/network-state';
import CircleIcon from '@mui/icons-material/Circle';
import LoadingButton from '@mui/lab/LoadingButton';
import Tooltip from '@mui/material/Tooltip';

export default function StacksChainTipButton() {
  const [networkInfo] = useAtom(networkInfoAtom);
  const [currentExplorer] = useAtom(currentExplorerState);
  const [currentChain] = useAtom(currentChainState);

  return (
    <>
      <Tooltip title="Stacks Chain Tip">
        <LoadingButton
          loading={networkInfo.stacks_tip === undefined}
          loadingPosition="start"
          href={`${currentExplorer}/block/${networkInfo.stacks_tip}?chain=${currentChain}`}
          target="_blank"
          startIcon={<CircleIcon />}
          variant="text"
          size="small"
          color="success"
        >
          {networkInfo.stacks_tip_height}
        </LoadingButton>
      </Tooltip>
    </>
  );
}
