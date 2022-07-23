import { Box, Grid, GridItem } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { ClubList, SearchBox } from '../components/features';
import { useAppDispatch } from '../hooks';
import { Layout } from '../layouts';
import { clubsRequest } from '../store/slices/clubsCatalog';

export const ClubsPage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clubsRequest({ limit: 6, nameFilter: '', offset: 0 }));
  }, [dispatch]);

  return (
    <Layout>
      <Box>
        <Grid
          templateColumns={{ base: 'repeat(1,1fr)', xl: 'repeat(3,1fr)' }}
          gap="8"
        >
          <GridItem>
            <SearchBox />
          </GridItem>
          <GridItem colSpan={{ base: 1, xl: 2 }}>
            <ClubList
              templateColumns={{ base: 'repeat(1,1fr)', md: 'repeat(2,1fr)' }}
            />
          </GridItem>
        </Grid>
      </Box>
    </Layout>
  );
};
