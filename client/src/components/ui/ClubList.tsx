import { Grid, GridItem } from '@chakra-ui/react';
import { FC } from 'react';
import { Club } from '../../model';
import { ClubCard } from './ClubCard';

type Props = {
  clubs: Club[];
};

export const ClubList: FC<Props> = ({ clubs }) => {
  return (
    <Grid
      gap={5}
      templateColumns={{
        base: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',
      }}
    >
      {clubs.map((club) => (
        <GridItem key={club.id}>
          <ClubCard club={club} />
        </GridItem>
      ))}
    </Grid>
  );
};
