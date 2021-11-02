import * as React from 'react';
import { useAtom } from 'jotai';
import { useNetwork } from '@micro-stacks/react';
import { StacksMainnet, StacksRegtest, StacksMocknet, StacksTestnet } from 'micro-stacks/network';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import CheckIcon from '@mui/icons-material/Check';
import { DEFAULT_NETWORK_LIST } from '@utils/constants';
import { currentNetworkAtom, Network } from '@store/current-network-state';

const networks: Network[] = DEFAULT_NETWORK_LIST;

export interface NetworkDialogProps {
  open: boolean;
  selectedValue: number;
  onClose: (index: number) => void;
}

export default function SelectNetworkDialog(props: NetworkDialogProps) {
  const { onClose, selectedValue, open } = props;
  const { handleSetNetwork } = useNetwork();
  const [currentNetwork, setCurrentNetwork] = useAtom(currentNetworkAtom);
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (index: number) => {
    // used to select and display user selections
    setCurrentNetwork(DEFAULT_NETWORK_LIST[index]);

    // sets the currently active network used by the wallet
    handleSetNetwork(
      index === 0
        ? new StacksMainnet({ url: DEFAULT_NETWORK_LIST[index].url })
        : index === 1
        ? new StacksTestnet({ url: DEFAULT_NETWORK_LIST[index].url })
        : index === 2
        ? new StacksRegtest({ url: DEFAULT_NETWORK_LIST[index].url })
        : new StacksMocknet({ url: DEFAULT_NETWORK_LIST[index].url })
    );
    onClose(index);
  };

  return (
    <Dialog fullWidth={true} maxWidth="xs" onClose={handleClose} open={open}>
      <DialogTitle>Select network</DialogTitle>
      <List sx={{ pt: 0 }}>
        {networks.map(network => (
          <ListItem button onClick={() => handleListItemClick(network.index)} key={network.index}>
            <ListItemAvatar>
              <Avatar>
                {currentNetwork.index === network.index ? (
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
