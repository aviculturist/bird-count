import * as React from 'react';
import { useAtom } from 'jotai';
import Tooltip from '@mui/material/Tooltip';
import BlurOnTwoToneIcon from '@mui/icons-material/BlurOnTwoTone';
import Button from '@mui/material/Button';
import { networkDialogIsOpenAtom } from '@store/network-dialog-is-open';
import { currentNetworkAtom } from '@store/current-network-state';
import SelectNetworkDialog from '@components/select-network-dialog';

export default function ToggleSelectNetworkDialogButton() {
  const [open, setOpen] = useAtom(networkDialogIsOpenAtom);
  const [currentNetwork] = useAtom(currentNetworkAtom);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (index: number) => {
    setOpen(false);
  };

  return (
    <>
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
      <SelectNetworkDialog selectedValue={currentNetwork.index} open={open} onClose={handleClose} />
    </>
  );
}
