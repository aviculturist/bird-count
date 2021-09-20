import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
//import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
//import { useAtomValue, useHydrateAtoms } from 'jotai/utils';
import { useHandleIncrement } from '@hooks/use-increment';
import { useAtom } from 'jotai';
import { birdCountAtom } from '@store/bird-count';

// TODO: test hydration as alternative
// export const getServerSideProps: GetServerSideProps<{
//   initialCount: number;
// }> = async context => {
//   return { props: { initialCount: 42 } };
// };

export default function BirdCountButtonGroup() {
  // export default function BirdCountButtonGroup({initialCount,}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  //   useHydrateAtoms([[birdCountAtom, initialCount]] as const);
  //const count = useAtomValue(birdCountAtom);
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
