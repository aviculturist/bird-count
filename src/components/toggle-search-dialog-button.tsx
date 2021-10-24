import * as React from 'react';
import { useAtom } from 'jotai';
import Tooltip from '@mui/material/Tooltip';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Button from '@mui/material/Button';
import { searchDialogIsOpenAtom } from '@store/search-dialog-is-open';
import SearchDialog from '@components/search-dialog';

export default function ToggleSearchDialogButton() {
  const [open, setOpen] = useAtom(searchDialogIsOpenAtom);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Tooltip
        title={`Search for Addresses, Contracts, Block Hashes and Pending or Completed Transactions and view your search history.`}
      >
        <Button
          sx={{ textTransform: 'none', borderRadius: 8, mx: 2, pr: 6 }}
          variant="outlined"
          startIcon={<SearchOutlinedIcon fontSize="small" />}
          onClick={handleClickOpen}
          color="primary"
        >
          Search...
        </Button>
      </Tooltip>
      <SearchDialog />
    </>
  );
}
