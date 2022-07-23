import { Grid, GridItem, ResponsiveValue } from '@chakra-ui/react';
import { FC } from 'react';
import { Club } from '../../../../model';
import { ClubCard } from './ClubCard';

type Props = {
  templateColumns?: ResponsiveValue<0 | (string & {})>;
  clubs: Club[];
};

export const ClubList: FC<Props> = ({ clubs, templateColumns }) => {
  return (
    <Grid templateColumns={templateColumns} gap="5">
      {clubs.map((club) => (
        <GridItem key={club.id}>
          <ClubCard club={club} />
        </GridItem>
      ))}
    </Grid>
  );
};
