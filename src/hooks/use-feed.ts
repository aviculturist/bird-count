import { allTransactionsAtom, BirdCount } from '@store/bird-count';
import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import { useEffect } from 'react';
import { feedItemsAtom } from '@store/feed';
import { useImmerAtom } from 'jotai/immer';
import { pendingTransactionsCountAtom } from '@store/pending-transactions-count';

export function useFeed() {
  const apiData = useAtomValue(allTransactionsAtom);
  const [pendingTransactionsCount, setPendingTransactionsCount] = useAtom(
    pendingTransactionsCountAtom
  );
  const [feed, setFeed] = useImmerAtom<Record<string, BirdCount>>(feedItemsAtom);
  // this effect is to update our feed view without causing un-needed re-renders
  // @see https://docs.pmnd.rs/jotai/integrations/immer for immer docs
  useEffect(() => {
    // init
    if (Object.keys(feed).length === 0) {
      apiData.forEach(item => {
        setFeed(draft => {
          draft[item.txid] = item;
        });
      });
    } else {
      // find our new items that have yet to be added
      const newItems = apiData.filter(item => !feed[item.txid] && item.isPending);
      if (newItems?.length) {
        setPendingTransactionsCount(newItems.length);
        // mutate state with new items
        void setFeed(draft => {
          newItems.forEach(item => {
            if (!draft[item.txid]) draft[item.txid] = item;
          });
        });
      }

      // this updates as items confirm
      const itemsNoLongerPending = apiData.filter(item => !item.isPending);

      // this is static unless we update it
      const feedItemsPending = Object.values(feed).filter(item => item.isPending);

      // for each item that is no longer pending
      itemsNoLongerPending.forEach(item => {
        // if we find it in currently pending items
        if (feedItemsPending.find(_item => item.txid === _item.txid)) {
          // update just this one
          setFeed(draft => {
            draft[item.txid] = {
              ...draft[item.txid],
              //index: item.index,
              isPending: false,
            };
          });
        }
      });
    }
  }, [apiData, feed, setFeed, setPendingTransactionsCount]);

  return Object.values(feed);
}
