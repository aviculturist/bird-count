import * as React from 'react';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { networkAtom } from 'micro-stacks/react';
import Tooltip from '@mui/material/Tooltip';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import { birdCountAtom } from '@store/bird-count';
import { countIsLoadingAtom } from '@store/count-is-loading';
import { t, plural, Plural } from '@lingui/macro';

export default function BirdCountRefreshFab() {
  const [success, setSuccess] = React.useState(false);
  const [isLoadingCount, setIsLoadingCount] = useAtom(countIsLoadingAtom);
  const [birdCount, dispatchBirdCount] = useAtom(birdCountAtom);
  const [network] = useAtom(networkAtom);
  const timer = React.useRef<number>();

  // fetch latest data
  const refetch = () => {
    dispatchBirdCount({ type: 'refetch' });
  };

  // a visual progress indicator
  const refresh = (e?: React.MouseEvent<HTMLElement>) => {
    if (!isLoadingCount) {
      setSuccess(false);
      setIsLoadingCount(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setIsLoadingCount(false);
      }, 2000);
      e === undefined || e.preventDefault();
    }
    timer.current = window.setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
    boxShadow: 0,
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  // run once after initial render
  useEffect(() => {
    console.log('fetch birdCount once after initial render');
    refetch();
  }, []);

  // run when birdCount changes
  useEffect(() => {
    console.log('refresh count, birdcount changed');
    refresh();
  }, [birdCount]);

  // run when network changes
  useEffect(() => {
    console.log('refetch count, network changed');
    refetch();
    refresh();
  }, [network.getCoreApiUrl()]);

  const handleButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    refetch();
    refresh(e);
  };

  return (
    <Tooltip title={t`Fetch latest count`}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Stack spacing={2}>
          <Box sx={{ m: 1, position: 'relative' }}>
            <Fab
              variant="circular"
              size="small"
              color="primary"
              sx={buttonSx}
              onClick={handleButtonClick}
            >
              {success ? <CheckIcon /> : <RefreshOutlinedIcon />}
            </Fab>

            {isLoadingCount && (
              <CircularProgress
                size={50}
                sx={{
                  color: green[500],
                  position: 'absolute',
                  top: -5,
                  left: -5,
                  zIndex: 1,
                }}
              />
            )}
          </Box>
        </Stack>
      </Box>
    </Tooltip>
  );
}
