import { atom } from 'jotai';
export const pendingTransactionsCountAtom = atom(0);

export const currentPendingTransactionsCountState = atom(
  (get) => get(pendingTransactionsCountAtom),
  async (_get, set, newValue:number) => {
    set(pendingTransactionsCountAtom, newValue)
  }
)

// export const currentPendingTransactionsCountState = atom(get => {
//   const pendingTransactionsCount = get(pendingTransactionsCountAtom);
//   const defaultExplorer =
//     network.getCoreApiUrl() === DEFAULT_LOCALNET_SERVER
//       ? DEFAULT_LOCALNET_EXPLORER
//       : network.getCoreApiUrl() === DEFAULT_TESTNET_SERVER
//       ? DEFAULT_TESTNET_EXPLORER
//       : DEFAULT_MAINNET_EXPLORER;
//   return defaultExplorer;
// });
