import { useCallback } from 'react';
import { useAtom } from 'jotai';
import { useTransactionPopup } from 'micro-stacks/react';
import { currentBirdcountContractState } from '@store/current-network-state';
import { DECREMENT_FUNCTION } from '@utils/constants';
import { pendingTxIdsAtom, pendingTxAtom } from '@store/pending-transactions';

export function useHandleDecrement() {
  const [birdCountContract] = useAtom(currentBirdcountContractState);
  const [contractAddress, contractName] = birdCountContract.split('.');
  const { handleContractCall } = useTransactionPopup();
  const [pendingTxIds, setPendingTxIds] = useAtom(pendingTxIdsAtom);

  const onFinish = useCallback(
    data => {
      setPendingTxIds([...pendingTxIds, data.txId]); // adds this txid to the array of pending transactions
      void pendingTxAtom(data.txId); // creates an atomFamilyWithQuery to track status
    },
    [pendingTxIds, setPendingTxIds]
  );

  const onCancel = useCallback(errorMessage => {
    console.log('within onCancel: ');
    console.log(errorMessage);
  }, []);

  return useCallback(() => {
    void handleContractCall({
      contractAddress,
      contractName,
      functionName: DECREMENT_FUNCTION,
      functionArgs: [],
      postConditions: [],
      onFinish,
      onCancel,
    });
  }, [handleContractCall, contractAddress, contractName, onFinish, onCancel]);
}
