//https://github.com/Microsoft/TypeScript/issues/27481
// @ts-ignore
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v0.15.2/index.ts';
// @ts-ignore
import { assertEquals } from 'https://deno.land/std@0.107.0/testing/asserts.ts';

Clarinet.test({
  name: 'get-bird-count returns u0 immediately after being deployed',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    // Get the deployer account.
    const deployer = accounts.get('deployer')!;

    // Call the get-bird-count read-only function.
    // The first parameter is the contract name, the second the function name, and the
    // third the function arguments as an array. The final parameter is the tx-sender.
    const count = chain.callReadOnlyFn('bird-count', 'get-counter', [], deployer.address);

    // Assert that the returned result is a uint with a value of 0 (u0).
    // The unwrapped variety with Uint
    // count.result.expectUint(0);
    count.result.expectOk();
    // Or... wrapped variety with Int
    // block.receipts[0].result.expectOk().expectBool(true);
    // block.receipts[0].result.expectErr().expectUint(100);
    count.result.expectOk().expectInt(0);
  },
});

Clarinet.test({
  name: 'increment function counts up',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    // Get the deployer account.
    const deployer = accounts.get('deployer')!;

    // Mine a block with one transaction.
    const block = chain.mineBlock([
      // Generate a contract call to count-bird from the deployer address.
      Tx.contractCall('bird-count', 'increment', [], deployer.address),
    ]);

    // Get the first (and only) transaction receipt.
    const [receipt] = block.receipts;

    // Assert that the returned result is a boolean true.
    //receipt.result.expectOk().expectBool(true);

    // Get the bird-counter value.
    //const count = chain.callReadOnlyFn('bird-count', 'get-counter', [], deployer.address);

    // Assert that the returned result is a u1.
    //count.result.expectUint(1);

    // Wrapped variety with Int
    receipt.result.expectOk().expectInt(1);
  },
});
