import { useAtom } from 'jotai';
import { useAuth } from 'micro-stacks/react';
import Button from '@mui/material/Button';
//import LoadingButton from '@mui/lab/LoadingButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { birdCountAtom } from '@store/bird-count';
//import { useLoading } from '@hooks/use-loading';
import { LOADING_KEYS } from '@store/loading';
import { loadingAtom } from '@store/loading';
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

export default function BirdCountButtonGroup() {
  const [count, refresh] = useAtom(birdCountAtom);
  const handleIncrement = useHandleIncrement();
  const { isSignedIn } = useAuth();
  const [isWalletPopup] = useAtom(loadingAtom(LOADING_KEYS.WALLETPOPUP));
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

        <Button variant="contained">{count} birds</Button>
        <Tooltip title="Click to increment">
          <Button onClick={() => handleIncrement()} variant="contained">
            <AddIcon />
          </Button>
        </Tooltip>
      </ButtonGroup>
    </>
  );
}
