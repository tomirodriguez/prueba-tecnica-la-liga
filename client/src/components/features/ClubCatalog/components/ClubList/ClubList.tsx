import { Grid, GridItem, ResponsiveValue } from '@chakra-ui/react';
import { FC } from 'react';
import { useClubsCatalogSelector } from '../../../../../hooks';
import { useAppDispatch } from '../../../../../hooks/useAppDispatch';
import { useFavoriteTogglerSelector } from '../../../../../hooks/useFavoriteTogglerSelector';
import { toggleClubFavoriteRequest } from '../../../../../redux/slices/favoriteToggler';
import { ClubCard, NoClubsFound } from '../../../../ui';
import { SkeletonClubList } from '../../../../ui/SkeletonClubList';

type Props = {
  templateColumns?: ResponsiveValue<0 | (string & {})>;
};

export const ClubList: FC<Props> = ({ templateColumns }) => {
  const dispatch = useAppDispatch();
  const { loading, clubs } = useClubsCatalogSelector();
  const { loading: togglingFavorite, clubUpdatedId } =
    useFavoriteTogglerSelector();

  if (loading) return <SkeletonClubList />;

  const handleFavoriteToggle = (clubId: string, favorite: boolean) => {
    dispatch(toggleClubFavoriteRequest({ clubId, favorite }));
  };

  if (clubs.length === 0) return <NoClubsFound />;

  return (
    <Grid
      templateColumns={templateColumns}
      gap="5"
      as={'ol'}
      title="Club Catalog"
    >
      {clubs.map((club) => (
        <GridItem key={club.id} as={'li'} listStyleType="none">
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
