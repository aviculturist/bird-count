import * as React from 'react';
import { useAtom } from 'jotai';
import NoSsr from '@mui/core/NoSsr'; // !!
import Tooltip from '@mui/material/Tooltip';
import BlurOnTwoToneIcon from '@mui/icons-material/BlurOnTwoTone';
import Button from '@mui/material/Button';
import { selectNetworkDialogAtom } from '@store/select-network-dialog';
import { currentNetworkAtom } from '@store/current-network-state';
import SelectNetworkDialog from '@components/select-network-dialog';

export default function SelectNetworkDialogButton() {
  const [open, setOpen] = useAtom(selectNetworkDialogAtom);
  const [currentNetwork] = useAtom(currentNetworkAtom);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (index: number) => {
    setOpen(false);
  };

  return (
    <>
      <NoSsr>
        <Tooltip title={`Switch Networks`}>
          <Button
            variant="outlined"
            startIcon={<BlurOnTwoToneIcon fontSize="small" />}
            onClick={handleClickOpen}
            color="primary"
          >
            {currentNetwork.name}
          </Button>
        </Tooltip>
        <SelectNetworkDialog
          selectedValue={currentNetwork.index}
          open={open}
          onClose={handleClose}
        />
      </NoSsr>
    </>
  );
}
