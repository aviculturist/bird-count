import { useCallback } from 'react';
import { useAtom } from 'jotai';
import { useTransactionPopup } from 'micro-stacks/react';
import { useAuth } from 'micro-stacks/react';
import { LOADING_KEYS } from '@store/loading';
import { loadingAtom } from '@store/loading';
import { currentBirdcountContractState } from '@store/network-state';
import { INCREMENT_FUNCTION } from '@utils/constants';

export function useHandleIncrement() {
  const [birdCountContract] = useAtom(currentBirdcountContractState);
  const [contractAddress, contractName] = birdCountContract.split('.');
  const [isWalletPopup, setIsWalletPopup] = useAtom(loadingAtom(LOADING_KEYS.WALLETPOPUP));
  const { handleContractCall } = useTransactionPopup();

  const onFinish = useCallback(() => {
    void setIsWalletPopup(false);
  }, [setIsWalletPopup]);

  const onCancel = useCallback(() => {
    void setIsWalletPopup(false);
  }, [setIsWalletPopup]);

  return useCallback(() => {
    void setIsWalletPopup(true);
    void handleContractCall({
      contractAddress,
      contractName,
      functionName: INCREMENT_FUNCTION,
      functionArgs: [],
      postConditions: [],
      onFinish,
      onCancel,
    });
  }, [setIsWalletPopup, handleContractCall, contractAddress, contractName, onFinish, onCancel]);
}
