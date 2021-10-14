import * as React from 'react';
import { useAtom } from 'jotai';
import { networkInfoAtom } from '@store/network-info';
import { currentStacksExplorerState, currentChainState } from '@store/network-state';
import FiberManualRecordTwoToneIcon from '@mui/icons-material/FiberManualRecordTwoTone';
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
        <Button
          href={
            networkInfo.stacks_tip === undefined
              ? '#'
              : `${currentStacksExplorer}/block/${networkInfo.stacks_tip}?chain=${currentChain}`
          }
          target="_blank"
          startIcon={<FiberManualRecordTwoToneIcon />}
          variant="text"
          size="small"
          color={networkInfo.stacks_tip === undefined ? 'error' : 'success'}
        >
          {networkInfo.stacks_tip_height}
        </Button>
      </Tooltip>
    </>
  );
}
