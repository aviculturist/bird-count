import { useUser } from '@hooks/use-user';

export function useNetworkAddress(): string {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { addresses } = useUser();
  const env = process.env.NEXT_PUBLIC_NETWORK_ENV || 'mocknet'; // devnet, testnet or mainnet
  switch (env) {
    case 'mainnet':
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
      return addresses?.mainnet as string;
    default:
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
      return addresses?.testnet as string;
  }
}
