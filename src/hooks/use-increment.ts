import { useLoading } from '@hooks/use-loading';
import { LOADING_KEYS } from '@store/loading';
import { useNetwork } from '@hooks/use-network';
import { useCallback } from 'react';
import { BIRDCOUNT_CONTRACT, INCREMENT_FUNCTION } from '@utils/constants';
import { useTransactionPopup } from 'micro-stacks/react';

export function useHandleIncrement() {
  const [contractAddress, contractName] = BIRDCOUNT_CONTRACT.split('.');
  const address = contractAddress;
  const { setIsLoading } = useLoading(LOADING_KEYS.INCREMENT);
  const { handleContractCall } = useTransactionPopup();
  const network = useNetwork();

  const onFinish = useCallback(() => {
    void setIsLoading(false);
  }, [setIsLoading]);

  const onCancel = useCallback(() => {
    void setIsLoading(false);
  }, [setIsLoading]);

  return useCallback(() => {
    void setIsLoading(true);

    void handleContractCall({
      contractAddress,
      contractName,
      functionName: INCREMENT_FUNCTION,
      functionArgs: [],
      postConditions: [],
      onFinish,
      onCancel,
      network,
      stxAddress: address,
    });
  }, [
    setIsLoading,
    handleContractCall,
    contractAddress,
    contractName,
    onFinish,
    onCancel,
    network,
    address,
  ]);
}
