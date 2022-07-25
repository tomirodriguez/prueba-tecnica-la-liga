import { Grid, GridItem, ResponsiveValue } from '@chakra-ui/react';
import { FC } from 'react';
import { SkeletonClubCard } from '.';
import { createRandomArrayOfN } from '../../utils';

type Props = {
  amount?: number;
  templateColumns?: ResponsiveValue<0 | (string & {})>;
};

export const SkeletonClubList: FC<Props> = ({
  amount = 6,
  templateColumns,
}) => {
  return (
    <Grid
      templateColumns={templateColumns}
      gap="5"
      as={'ol'}
      title="Skeleton Cards"
    >
      {createRandomArrayOfN(amount).map((value) => (
        <GridItem key={`skeleton-club-card-${value}`}>
          <SkeletonClubCard />
        </GridItem>
      ))}
    </Grid>
  );
};
