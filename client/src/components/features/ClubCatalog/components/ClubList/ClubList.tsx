import { Box, Grid, GridItem, ResponsiveValue, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useClubsCatalogSelector } from '../../../../../hooks';
import { useAppDispatch } from '../../../../../hooks/useAppDispatch';
import { useFavoriteTogglerSelector } from '../../../../../hooks/useFavoriteTogglerSelector';
import { toggleClubFavoriteRequest } from '../../../../../redux/slices/favoriteToggler';
import { ClubCard, SkeletonClubCard } from '../../../../ui';
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
    dispatch(toggleClubFavoriteRequest({ clubId, favorite }));
  };

  if (clubs.length === 0)
    return (
      <Box mx="auto" maxW={300} my={8}>
        <Text fontSize={'lg'} textAlign="center">
          No se encontraron resultados para la busqueda que desea realizar.
          Intente de nuevo.
        </Text>
      </Box>
    );

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
