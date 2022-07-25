import { Grid, GridItem, ResponsiveValue } from '@chakra-ui/react';
import { FC } from 'react';
import { useClubsCatalogSelector } from '../../../../../hooks';
import { useFavoriteToggler } from '../../../../../hooks/useFavoriteToggler';
import { useFavoriteTogglerSelector } from '../../../../../hooks/useFavoriteTogglerSelector';
import { ClubCard, NoClubsFound } from '../../../../ui';
import { SkeletonClubList } from '../../../../ui/SkeletonClubList';

type Props = {
  templateColumns?: ResponsiveValue<0 | (string & {})>;
};

export const ClubList: FC<Props> = ({ templateColumns }) => {
  const toggleFavorite = useFavoriteToggler();
  const { loading: loadingClubs, clubs } = useClubsCatalogSelector();
  const { loading: togglingFavorite, clubUpdatedId } =
    useFavoriteTogglerSelector();

  if (loadingClubs)
    return <SkeletonClubList templateColumns={templateColumns} />;

  const handleFavoriteToggle = (clubId: string, favorite: boolean) => {
    toggleFavorite(clubId, favorite);
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
