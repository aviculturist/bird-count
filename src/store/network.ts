import { Atom, atom } from 'jotai';
import { StacksNetwork, StacksTestnet, StacksMainnet, StacksMocknet } from '@stacks/network';

const network = process.env.NEXT_PUBLIC_NETWORK_ENV || 'mocknet'; // mocknet, devnet, testnet or mainnet

export const networkAtom: Atom<StacksNetwork | undefined> = atom(() => {
  const whichnet =
    network === 'mainnet'
      ? new StacksMainnet()
      : network === 'testnet'
      ? new StacksTestnet()
      : new StacksMocknet();
  return whichnet;
});
