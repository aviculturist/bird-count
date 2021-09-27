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

const networks: Network[] = DEFAULT_NETWORK_LIST;
// [
//   { name: 'mainnet', label: 'stacks.co', url: 'https://stacks-node-api.stacks.co', chain: 'mainnet' },
//   { name: 'testnet', label: 'stacks.co', url: 'https://stacks-node-api.xenon.blockstack.org', chain: 'testnet'},
//   { name: 'localnet', label: 'localhost', url: 'http://localhost:3999', chain: 'testnet' },
// ];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: Network;
  onClose: (network: Network) => void;
}

function SimpleDialog(props: SimpleDialogProps): JSX.Element {
  const { onClose, selectedValue, open } = props;

  //const [ networks:Network[], setNetworks ] = useAtom(networksAtom);
  const [currentNetwork, setCurrentNetwork] = useAtom(currentNetworkAtom);
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (network: Network) => {
    setCurrentNetwork(network);
    onClose(network);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set network</DialogTitle>
      <List sx={{ pt: 0 }}>
        {networks.map((network, key) => (
          <ListItem button onClick={() => handleListItemClick(network)} key={key}>
            <ListItemAvatar>
              <Avatar>
                <CloudQueueIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<React.Fragment>{network.name} </React.Fragment>}
              secondary={<React.Fragment>{network.label}</React.Fragment>}
            />
            <ListItemAvatar>
              <Avatar>
                <CheckIcon />
              </Avatar>
            </ListItemAvatar>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default function NetworkDialog(): JSX.Element {
  const [open, setOpen] = useAtom(networkDialogAtom);
  const [currentNetwork, setCurrentNetwork] = useAtom(currentNetworkAtom);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (network: Network) => {
    setOpen(false);
    setCurrentNetwork(network);
  };

  return (
    <>
      <Button color="inherit" onClick={handleClickOpen}>
        Network
      </Button>
      <SimpleDialog selectedValue={currentNetwork} open={open} onClose={handleClose} />
    </>
  );
}
