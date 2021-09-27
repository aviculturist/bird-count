import { useAtom } from 'jotai';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { birdCountAtom } from '@store/bird-count';
import { useHandleIncrement } from '@hooks/use-increment';

// TODO: implement using @clarigen/web
// import { useCallback } from 'react';
// import { WebProvider, txErr, txOk } from '@clarigen/web';
// import { BirdCountContract, contracts } from '@contracts';
// import { birdCountInfo } from '@contracts/bird-count';

// TODO: implement using @clarigen/web
// function useHandleDecrement() {
//   return useCallback(() => {
//     const webconfig = {}; // ??
//     const { counter } = WebProvider.fromContracts(contracts, {
//       counter: birdCountInfo,
//     });
//     const configured_contracts = WebProvider.fromContracts(contracts, webconfig);
//     configured_contracts.callPublic({decrement});
//     WebProvider.callPublic({func: })
//   }
// }

export default function BirdCountButtonGroup(): JSX.Element {
  const [birdCount, setBirdCount] = useAtom(birdCountAtom);
  const handleIncrement = useHandleIncrement();

  // TODO: implement using @clarigen/web
  //const handleDecrement = useHandleDecrement();

  return (
    <>
      <ButtonGroup size="large" aria-label="large button group">
        <Tooltip title="Click to decrement">
          <Button onClick={() => handleIncrement()} variant="contained">
            <RemoveIcon />
          </Button>
        </Tooltip>

        <Button variant="contained">
          {birdCount} birds
        </Button>
        <Tooltip title="Click to increment">
          <Button onClick={() => handleIncrement()} variant="contained">
            <AddIcon />
          </Button>
        </Tooltip>
      </ButtonGroup>
    </>
  );
}
