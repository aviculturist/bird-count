import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import { networkDialogAtom } from '@store/network-dialog';
import { useAtom } from 'jotai';
import { DEFAULT_NETWORK_LIST } from '@utils/constants';
import { networksAtom, currentNetworkAtom, Network } from '@store/networks';
import NoSsr from '@mui/core/NoSsr';
import { useNetwork, currentNetworkName, useCurrentNetworkUrl } from 'micro-stacks/react';
import { StacksMainnet, StacksNetwork, StacksRegtest, StacksMocknet, StacksTestnet, HIRO_MAINNET_DEFAULT, HIRO_REGTEST_DEFAULT, HIRO_TESTNET_DEFAULT, HIRO_MOCKNET_DEFAULT} from 'micro-stacks/network';
import { useAtomValue } from 'jotai/utils';

// import { HIRO_MAINNET_DEFAULT, HIRO_REGTEST_DEFAULT, HIRO_TESTNET_DEFAULT, HIRO_MOCKNET_DEFAULT ) network.coreApiUrl
const networks: Network[] = DEFAULT_NETWORK_LIST;
//const networkName = network.coreApiUrl === HIRO_MAINNET_DEFAULT ? "Mainnet"

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: number;
  onClose: (index: number) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;
  const { handleSetNetwork } = useNetwork();
  const [currentNetwork, setCurrentNetwork] = useAtom(currentNetworkAtom);
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (index: number) => {
    setCurrentNetwork(DEFAULT_NETWORK_LIST[index]);
    handleSetNetwork(new StacksTestnet({ url: DEFAULT_NETWORK_LIST[index].url }));
    onClose(index);
  };

  return (
    <Dialog fullWidth={true} maxWidth="xs" onClose={handleClose} open={open}>
      <DialogTitle>Set network</DialogTitle>
      <List sx={{ pt: 0 }}>
        {networks.map(network => (
          <ListItem button onClick={() => handleListItemClick(network.index)} key={network.index}>
            <ListItemAvatar>
              <Avatar>
                {currentNetwork.name === network.name ? (
                  <CheckIcon color="success" />
                ) : (
                  <CloudQueueIcon color="info" />
                )}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<React.Fragment>{network.name}</React.Fragment>}
              secondary={<React.Fragment>{network.label}</React.Fragment>}
            />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default function NetworkDialog() {
  const [open, setOpen] = useAtom(networkDialogAtom);
  const [currentNetwork, setCurrentNetwork] = useAtom(currentNetworkAtom);
  const name = useAtomValue(currentNetworkName);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (index: number) => {
    setOpen(false);
    setCurrentNetwork(DEFAULT_NETWORK_LIST[index]);
  };

  return (
    <>
      <NoSsr>
        <Button color="inherit" onClick={handleClickOpen}>
          {name}
        </Button>
      </NoSsr>
      <SimpleDialog selectedValue={currentNetwork.index} open={open} onClose={handleClose} />
    </>
  );
}
