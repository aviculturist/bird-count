import * as React from 'react';
import { useAtom } from 'jotai';
import { useAuth } from 'micro-stacks/react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { birdCountAtom } from '@store/bird-count';
import { currentStacksExplorerState, currentChainState } from '@store/current-network-state';
import { currentBirdcountContractState } from '@store/current-network-state';
import { installWalletDialogAtom } from '@store/install-wallet-dialog';
import { useHandleIncrement } from '@hooks/use-increment';
import { useHandleDecrement } from '@hooks/use-decrement';
import InstallWalletDialog from '@components/install-wallet-dialog';
import TransactionSnackbars from '@components/transaction-snackbars';
import BirdCountRefreshFab from '@components/bird-count-refresh-fab';
import { t, plural } from '@lingui/macro';

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

function BirdCountButtonGroup() {
  const [birdCount] = useAtom(birdCountAtom);
  const handleIncrement = useHandleIncrement();
  const handleDecrement = useHandleDecrement();
  const [currentStacksExplorer] = useAtom(currentStacksExplorerState);
  const [currentChain] = useAtom(currentChainState);
  const [birdCountContract] = useAtom(currentBirdcountContractState);
  const { isSignedIn, handleSignIn, session } = useAuth();
  const [, setOpen] = useAtom(installWalletDialogAtom);

  // function handleClick() {
  //   setIsLoadingCount(true);
  //   const refetch = () => {
  //     dispatchBirdCount({ type: 'refetch' });
  //   };
  //   refetch();
  //   setIsLoadingCount(false);
  // }
  // TODO: implement using @clarigen/web
  //const handleDecrement = useHandleDecrement();

  return (
    <>
      <Stack sx={{ alignItems: 'center' }} spacing={2}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ m: 1, position: 'relative' }}>
            <ButtonGroup size="large" variant="contained">
              <Tooltip title={t`Click to decrement`}>
                <Button
                  href="#"
                  onClick={
                    isSignedIn
                      ? () => handleDecrement()
                      : () => {
                          try {
                            handleSignIn();
                          } catch (_e) {
                            console.log(_e);
                          }
                          !session && setOpen(true);
                        }
                  }
                >
                  <RemoveIcon />
                </Button>
              </Tooltip>
              <Tooltip title={t`View smart contract`}>
                <Button
                  variant="contained"
                  fullWidth={true}
                  href={`${currentStacksExplorer}/txid/${birdCountContract}?chain=${currentChain}`}
                  target="_blank"
                >
                  {t({
                    message: plural(birdCount, {
                      one: '# bird',
                      other: '# birds',
                    }),
                  })}
                </Button>
              </Tooltip>
              {/* Another way to do plurals
              <Button>
                <Plural value={birdCount} one="# bird" other="# birds" />
              </Button> */}
              <Tooltip title={t`Click to increment`}>
                <Button
                  href="#"
                  onClick={
                    isSignedIn
                      ? () => handleIncrement()
                      : () => {
                          try {
                            handleSignIn();
                          } catch (_e) {
                            console.log(_e);
                          }
                          !session && setOpen(true);
                        }
                  }
                >
                  <AddIcon />
                </Button>
              </Tooltip>
            </ButtonGroup>
          </Box>
        </Box>
        <BirdCountRefreshFab />
      </Stack>

      <InstallWalletDialog />
      <TransactionSnackbars />
    </>
  );
}
//BirdCountButtonGroup.WhyDidYouRender = true;
export default BirdCountButtonGroup;
