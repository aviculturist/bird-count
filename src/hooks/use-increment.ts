import { LOADING_KEYS } from '@store/loading';
import { useCallback } from 'react';
import { BIRDCOUNT_CONTRACT, INCREMENT_FUNCTION } from '@utils/constants';
import { useTransactionPopup } from 'micro-stacks/react';
import { loadingAtom } from '@store/loading';
import { useAtom } from 'jotai';

export function useHandleIncrement() {
  const [contractAddress, contractName] = BIRDCOUNT_CONTRACT?.split('.') || '';
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
