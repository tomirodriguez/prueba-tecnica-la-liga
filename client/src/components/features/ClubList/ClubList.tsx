import { Grid, GridItem, ResponsiveValue } from '@chakra-ui/react';
import { FC } from 'react';
import { useClubsCatalogSelector } from '../../../hooks';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useFavoriteTogglerSelector } from '../../../hooks/useFavoriteTogglerSelector';
import { toggleClubFavorite } from '../../../redux/slices/favoriteToggler';
import { ClubCard, SkeletonClubCard } from '../../ui';
import { createRandomArrayOfN } from './utils';

type Props = {
  templateColumns?: ResponsiveValue<0 | (string & {})>;
};

export const ClubList: FC<Props> = ({ templateColumns }) => {
  const dispatch = useAppDispatch();
  const { loading, clubs } = useClubsCatalogSelector();
  const { loading: togglingFavorite, clubUpdatedId } =
    useFavoriteTogglerSelector();

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

  const handleFavoriteToggle = (clubId: string, favorite: boolean) => {
    dispatch(toggleClubFavorite({ clubId, favorite }));
  };

  return (
    <Grid templateColumns={templateColumns} gap="5">
      {clubs.map((club) => (
        <GridItem key={club.id}>
          <ClubCard
            club={club}
            onFavoriteToggle={handleFavoriteToggle}
            isTogglingFavorite={togglingFavorite && clubUpdatedId === club.id}
          />
        </GridItem>
      ))}
    </Grid>
  );
};
