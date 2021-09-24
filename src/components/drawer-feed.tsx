import * as React from 'react';
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
import { IconButton, Pagination, Tooltip, Typography } from '@mui/material';
import { toRelativeTime } from '@utils/time';

export default function DrawerFeed() {
  const { isDrawer, setIsDrawer } = useDrawer();
  const feed = useFeed();
  console.log('this is the feed');
  console.log(feed);
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
                      href={`http://localhost:8000/txid/${item.txid}`}
                      aria-label="go"
                    >
                      <LaunchIcon fontSize="small" />
                    </IconButton>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    {toRelativeTime(item.timestamp * 1000)}
                  </React.Fragment>
                }
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
      <Drawer
        style={{ width: '600px' }}
        anchor="right"
        open={isDrawer}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </div>
  );
}
