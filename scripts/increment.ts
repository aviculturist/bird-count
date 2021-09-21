import { NodeProvider, NodeTransaction } from '@clarigen/node';
import { WebTransactionReceipt } from '@clarigen/core';
import { contracts } from '@contracts';
import { StacksMocknet } from '@stacks/network';

// wallet_1 private key
// this is the private key making transactions.
const privateKey = '7287ba251d44a4d3fd9276c88ce34c5c52a038955511cccaf77e61068649c17801';

const clarigenConfig = {
  privateKey,
  network: new StacksMocknet(),
  deployerAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
};

const deployed = NodeProvider.fromContracts(contracts, clarigenConfig);

async function run() {
  const counter = deployed.birdCount.contract;

  const incrementTx = counter.increment() as NodeTransaction<boolean, null>;

  const result = (await incrementTx.submit({
    postConditions: [],
  })) as WebTransactionReceipt<number, null>;

  console.log(`http://localhost:3999/extended/v1/tx/0x${result.txId}`);
}

run()
  .catch(console.error)
  .finally(() => {
    process.exit();
  });
