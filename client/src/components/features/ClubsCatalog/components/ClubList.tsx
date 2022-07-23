import { Grid, GridItem, ResponsiveValue } from '@chakra-ui/react';
import { FC } from 'react';
import { Club } from '../../../../model';
import { ClubCard, SkeletonClubCard } from './';
import { createRandomArrayOfN } from './utils';

type Props = {
  loading: boolean;
  templateColumns?: ResponsiveValue<0 | (string & {})>;
  clubs: Club[];
};

export const ClubList: FC<Props> = ({ clubs, templateColumns, loading }) => {
  if (loading)
    return (
      <Grid templateColumns={templateColumns} gap="5">
        {createRandomArrayOfN(6).map((value) => (
          <GridItem key={`skeleton-club-card-${value}`}>
            <SkeletonClubCard />
          </GridItem>
        ))}
      </Grid>
    );

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
