import { useAtom } from 'jotai';
import { transactionsDrawerIsOpenAtom } from '@store/transactions-drawer-is-open';

interface TransactionsDrawer {
  transactionsDrawerIsOpen: boolean;
  setTransactionsDrawerIsOpen: (update: any) => void;
}

export function useTransactionsDrawerIsOpen(): TransactionsDrawer {
  const [transactionsDrawerIsOpen, setTransactionsDrawerIsOpen] = useAtom(
    transactionsDrawerIsOpenAtom
  );
  return {
    transactionsDrawerIsOpen: transactionsDrawerIsOpen,
    setTransactionsDrawerIsOpen: setTransactionsDrawerIsOpen,
  };
}
