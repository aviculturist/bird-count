import { useCallback } from 'react';
import { useAtom } from 'jotai';
import { useTransactionPopup } from 'micro-stacks/react';
import { currentBirdcountContractState } from '@store/network-state';
import { INCREMENT_FUNCTION } from '@utils/constants';
import { pendingTxIdsAtom, pendingTxAtom } from '@store/pending-transactions';

export function useHandleIncrement() {
  const [birdCountContract] = useAtom(currentBirdcountContractState);
  const [contractAddress, contractName] = birdCountContract.split('.');
  const { handleContractCall } = useTransactionPopup();
  const [pendingTxIds, setPendingTxIds] = useAtom(pendingTxIdsAtom);

  const onFinish = useCallback(
    data => {
      setPendingTxIds([...pendingTxIds, data.txId]); // adds this txid to the array of pending transactions
      // creates an atomFamilyWithQuery
      // TODO: this almost always results in a race condition where the node hasn't processed the tx yet
      // so the first query fails
      const ptx = pendingTxAtom(data.txId);
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
      functionName: INCREMENT_FUNCTION,
      functionArgs: [],
      postConditions: [],
      onFinish,
      onCancel,
    });
  }, [handleContractCall, contractAddress, contractName, onFinish, onCancel]);
}
