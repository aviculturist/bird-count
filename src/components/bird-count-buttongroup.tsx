import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useHandleIncrement } from '@hooks/use-increment';
import { useAtom } from 'jotai';
import { birdCountAtom } from '@store/bird-count';


export default function BirdCountButtonGroup() {
  const [count, refresh] = useAtom(birdCountAtom);

  const handleIncrement = useHandleIncrement();

  return (
    <>
      <ButtonGroup size="large" aria-label="large button group">
        <Button variant="contained" onClick={() => handleIncrement()}>
          <RemoveIcon />
        </Button>
        <Button variant="contained">{count} birds</Button>
        <Button variant="contained" onClick={() => handleIncrement()}>
          <AddIcon />
        </Button>
      </ButtonGroup>
    </>
  );
}
