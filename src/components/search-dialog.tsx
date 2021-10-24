import * as React from 'react';
import { useAtom } from 'jotai';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import AutocompleteSearch from '@components/autocomplete-search';
import SearchHistory from '@components/search-history';
import SearchFavorites from '@components/search-favorites';
import { searchDialogIsOpenAtom } from '@store/search-dialog-is-open';

export default function SearchDialog() {
  const [open, setOpen] = useAtom(searchDialogIsOpenAtom);

  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      onClose={() => setOpen(false)}
      open={open}
      sx={{ borderRadius: 8 }}
    >
      <DialogTitle>
        <AutocompleteSearch />
      </DialogTitle>
      <SearchHistory />
      <SearchFavorites />
    </Dialog>
  );
}
