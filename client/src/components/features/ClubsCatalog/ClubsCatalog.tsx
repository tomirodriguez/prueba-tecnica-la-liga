import { Box, Grid, GridItem } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useAppDispatch } from '../../../hooks';
import { useClubsSelector } from '../../../hooks/useClubsSelector';
import { clubsRequest } from '../../../store/slices/clubs';
import { ClubList } from './components';
import { SearchBox } from './components/SearchBox';

export const ClubsCatalog: FC = () => {
  const { clubs, loading } = useClubsSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clubsRequest({ limit: 6, nameFilter: '', offset: 0 }));
  }, [dispatch]);

  const handleSearchRequest = (searchValue: string) => {
    dispatch(clubsRequest({ nameFilter: searchValue }));
  };

  return (
    <Box>
      <Grid
        templateColumns={{ base: 'repeat(1,1fr)', xl: 'repeat(3,1fr)' }}
        gap="8"
      >
        <GridItem>
          <SearchBox onSearch={handleSearchRequest} />
        </GridItem>
        <GridItem colSpan={{ base: 1, xl: 2 }}>
          <ClubList
            clubs={clubs}
            loading={loading}
            templateColumns={{ base: 'repeat(1,1fr)', md: 'repeat(2,1fr)' }}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
