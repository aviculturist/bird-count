import * as React from 'react';
import { IconButton, Pagination, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import LaunchIcon from '@mui/icons-material/Launch';
import { useDrawer } from '@hooks/use-drawer';
import { useFeed } from '@hooks/use-feed';
import { toRelativeTime } from '@utils/time';
import { currentExplorerState, currentChainState } from '@store/network-state';
import { useAtom } from 'jotai';

export default function DrawerFeed() {
  const { isDrawer, setIsDrawer } = useDrawer();
  const [explorer] = useAtom(currentExplorerState);
  const [chain] = useAtom(currentChainState);
  const feed = useFeed();
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setIsDrawer(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        subheader={<ListSubheader>BirdCounts</ListSubheader>}
      >
        {feed.map((item, key) => (
          <ListItem button key={key}>
            <ListItemIcon>
              <Tooltip key={key} title={item.sender}>
                {item.isPending ? <AutorenewIcon /> : <CheckCircleOutlineIcon color="success" />}
              </Tooltip>
            </ListItemIcon>
            <Tooltip key={key} title={item.txid}>
              <ListItemText
                primary={
                  <React.Fragment>
                    {item.function}{' '}
                    <IconButton
                      target="_blank"
                      href={`${explorer}/txid/${item.txid}?chain=${chain}`}
                      aria-label="go"
                    >
                      <LaunchIcon fontSize="small" />
                    </IconButton>
                  </React.Fragment>
                }
                secondary={<React.Fragment>{toRelativeTime(item.timestamp * 1000)}</React.Fragment>}
              />
            </Tooltip>
          </ListItem>
        ))}
      </List>
      <Pagination count={10} siblingCount={0} boundaryCount={0} />
    </Box>
  );

  return (
    <div>
      <Drawer anchor="right" open={isDrawer} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}
