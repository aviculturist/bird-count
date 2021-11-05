import { useCallback } from 'react';
import {
  customNetworksAtom,
  currentNetworkIndexAtom,
  currentNetworkIsSwitchingAtom,
  networksAtom,
  Network,
  anyNetworkStatusAtom,
} from '@store/networks';
import { useAtomCallback, useAtomValue } from 'jotai/utils';
import { useAtom } from 'jotai';

export const useNetworks = () => {
  const [customNetworks, setCustomNetworks] = useAtom(customNetworksAtom);
  const networks = useAtomValue(networksAtom);
  const [currentNetworkIndex, setCurrentNetworkIndex] = useAtom(currentNetworkIndexAtom);
  const [currentNetworkIsSwitching, setCurrentNetworkIsSwitching] = useAtom(currentNetworkIsSwitchingAtom);

  // const handleSetPendingChange = () => {
  //   console.log('set pending');
  //   void setNetworkSwitching('pending');
  // };

  const handleUpdateNetworkIndex = useAtomCallback<void, number>(
    useCallback((get, set, arg) => {
      //void set(networkSwitchingState, 'pending');
      void set(currentNetworkIndexAtom, arg);
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
    }, [])
  );

  const handleAddNetwork = useAtomCallback<void, Network>(
    useCallback((get, set, arg) => {
      void set(customNetworksAtom, [...customNetworks, arg]);
      void handleUpdateNetworkIndex(networks.length);
    }, [])
  );

  const handleRemoveNetwork = useAtomCallback<void, Network>(
    useCallback((get, set, arg) => {
      const networksSet = new Set(customNetworks);
      anyNetworkStatusAtom.remove(arg.name); // remove the status query
      networksSet.delete(arg);
      Array.from(networksSet);
      void set(customNetworksAtom, Array.from(networksSet));
      void handleUpdateNetworkIndex(0);
    }, [])
  );

  //const isSwitching = networkSwitching === 'pending';

  return {
    networks,
    setCustomNetworks,
    currentNetworkIndex,
    setCurrentNetworkIndex,
    currentNetworkIsSwitching,
    setCurrentNetworkIsSwitching,
    handleUpdateNetworkIndex,
    handleAddNetwork,
    handleRemoveNetwork,
  };
};
