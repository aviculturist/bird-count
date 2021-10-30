import { useAtom } from 'jotai';
import { installWalletDialogIsOpenAtom } from '@store/install-wallet-dialog-is-open';

interface InstallWalletDialogIsOpenType {
  installWalletDialogIsOpen: boolean;
  setInstallWalletDialogIsOpen: (update: any) => void;
}

export function useInstallWalletDialog(): InstallWalletDialogIsOpenType {
  const [installWalletDialogIsOpen, setInstallWalletDialogIsOpen] = useAtom(installWalletDialogIsOpenAtom);
  return { installWalletDialogIsOpen, setInstallWalletDialogIsOpen };
}
