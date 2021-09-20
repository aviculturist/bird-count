import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useLoading } from '@hooks/use-loading';
import { LOADING_KEYS } from '@store/loading';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function LoadingBackdrop(): JSX.Element {
  const { isLoading, setIsLoading } = useLoading(LOADING_KEYS.AUTH);

  const handleClose = () => {
    isLoading ? setIsLoading(true) : setIsLoading(false);
  };

  const handleToggle = () => {
    setIsLoading(true);
  };

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={isLoading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
        <Box>
          <Typography>Connect your wallet</Typography>
        </Box>
      </Backdrop>
    </div>
  );
}
