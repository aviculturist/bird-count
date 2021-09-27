import { smartContractsClientAtom, transactionsClientAtom, accountsClientAtom } from '@store/api';
import {
  BIRDCOUNT_CONTRACT,
  COUNT_FUNCTION,
  INCREMENT_FUNCTION,
  DECREMENT_FUNCTION,
  currentNetwork
} from '@utils/constants';
import { userStxAddressesAtom } from 'micro-stacks/react';
import { cvToJSON, hexToCV } from '@stacks/transactions';
import { atom, useAtom } from 'jotai';
import { atomWithQuery } from 'jotai-query-toolkit';
import {
  ContractCallTransaction,
  MempoolTransactionListResponse,
  TransactionResults,
} from '@blockstack/stacks-blockchain-api-types';

export interface BirdCount {
  sender: string;
  txid: string;
  contract?: string;
  function?: string;
  timestamp: number;
  isPending?: boolean;
}

/*
 * A list of the confirmed increment transactions associated with a specific
 * address. TODO: don't think it's used any more, can be removed
 */
export const confirmedTxsAtom = atomWithQuery<BirdCount[]>('confirmed-txs', async get => {
  const address = get(userStxAddressesAtom);
  const client = get(accountsClientAtom);
  const txClient = get(transactionsClientAtom);
  if (!address?.testnet) return []; // TODO not ideal way to test if is logged in
  const txs = await client.getAccountTransactions({
    limit: 50,
    principal: currentNetwork.chain === 'testnet' ? ( address?.testnet || '' ) : ( address?.mainnet ),
  });

  const txids = (txs as TransactionResults).results
    .filter(
      tx =>
        tx.tx_type === 'contract_call' &&
        tx.contract_call.contract_id === BIRDCOUNT_CONTRACT &&
        (tx.contract_call.function_name === INCREMENT_FUNCTION ||
          tx.contract_call.function_name === DECREMENT_FUNCTION) &&
        tx.tx_status === 'success'
    )
    .map(tx => tx.tx_id);

  const final = await Promise.all(txids.map(async txId => txClient.getTransactionById({ txId })));
  return (
    (final as ContractCallTransaction[]).map(tx => {
      return {
        sender: tx.sender_address,
        txid: tx.tx_id,
        function: tx.contract_call.function_name,
        contract: tx.contract_call.contract_id.split('.')[1],
        timestamp: tx.burn_block_time,
      };
    }) || []
  );
});

/*
 * A list of the confirmed increment transactions associated with a specific
 * address.
 */
// TODO: blockstack exports this in .d.ts file so it can't be transpiled
enum GetTransactionListTypeEnum {
  coinbase = 'coinbase',
  token_transfer = 'token_transfer',
  smart_contract = 'smart_contract',
  contract_call = 'contract_call',
  poison_microblock = 'poison_microblock',
}

export const recentTxsAtom = atomWithQuery<BirdCount[]>('recent-txs', async get => {
  const txClient = get(transactionsClientAtom);
  const txs = await txClient.getTransactionList({
    limit: 50,
    type: [GetTransactionListTypeEnum['contract_call']],
  });
  // console.log('ALL TXS');
  // console.log(txs);
  const txids = (txs as TransactionResults).results
    .filter(
      tx =>
        tx.tx_type === 'contract_call' &&
        tx.contract_call.contract_id === BIRDCOUNT_CONTRACT &&
        (tx.contract_call.function_name === INCREMENT_FUNCTION ||
          tx.contract_call.function_name === DECREMENT_FUNCTION) &&
        tx.tx_status === 'success'
    )
    .map(tx => tx.tx_id);
  const final = await Promise.all(txids.map(async txId => txClient.getTransactionById({ txId })));
  return (
    (final as ContractCallTransaction[]).map(tx => {
      return {
        sender: tx.sender_address,
        txid: tx.tx_id,
        function: tx.contract_call.function_name,
        contract: tx.contract_call.contract_id.split('.')[1],
        timestamp: tx.burn_block_time,
      };
    }) || []
  );
});

/*
 * The list of pending increment transactions in the mempool
 */
export const pendingTxsAtom = atomWithQuery<BirdCount[]>('pending-txs', async get => {
  const client = get(transactionsClientAtom);

  const txs = await client.getMempoolTransactionList({ limit: 96 });
  // console.log('all pending increment transactions');
  // console.log(txs);
  const birdCountTxs = (txs as MempoolTransactionListResponse).results
    .filter(
      tx =>
        tx.tx_type === 'contract_call' &&
        tx.contract_call.contract_id === BIRDCOUNT_CONTRACT &&
        (tx.contract_call.function_name === INCREMENT_FUNCTION ||
          tx.contract_call.function_name === DECREMENT_FUNCTION) &&
        tx.tx_status === 'pending'
    )
    .map(tx => tx.tx_id);

  const final = await Promise.all(
    birdCountTxs.map(async txId => client.getTransactionById({ txId }))
  );

  return (
    (final as ContractCallTransaction[]).map(tx => {
      return {
        sender: tx.sender_address,
        txid: tx.tx_id,
        function: tx.contract_call.function_name,
        contract: tx.contract_call.contract_id.split('.')[1],
        timestamp: Math.floor(Date.now() / 1000), //tx.receipt_time,
        isPending: true,
      };
    }) || []
  );
});

/*
 * Find the emitted events that match this pattern, reconcile them with the
 * user's confirmed transactions, then merge with pending mempool transactions
 */
export const allTransactionsAtom = atom(get => {
  const txs = get(recentTxsAtom);
  // console.log('txs');
  // console.log(txs);
  const pending = get(pendingTxsAtom);
  const feed = txs.map(tx => {
    return {
      sender: tx.sender,
      txid: tx.txid,
      function: tx.function,
      contract: tx.contract,
      timestamp: tx.timestamp,
    };
  });
  const combined = [...pending, ...feed];
  return combined
    .filter(item => combined.find(_item => item.txid === _item.txid))
    .sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1)) as BirdCount[];
});

/*
 * The current count
 */
export const birdCountAtom = atomWithQuery<number>('bird-count', async get => {
  const client = get(smartContractsClientAtom);
  const [contractAddress, contractName] = BIRDCOUNT_CONTRACT?.split('.') || '';
  try {
    const data = await client.callReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: COUNT_FUNCTION,
      readOnlyFunctionArgs: {
        sender: contractAddress,
        arguments: [],
      },
    });
    if (data.okay && data.result) {
      const result = cvToJSON(hexToCV(data.result as string)); // TODO
      return result.value;
    } // TODO: failed to fetch
  } catch (_e) {}
  return 0;
});
