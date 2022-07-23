import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { ClubList, Filters, SearchBox } from '../components/features';
import { Pagination } from '../components/features/Pagination';
import { useAppDispatch } from '../hooks';
import { Layout } from '../layouts';
import { clubsRequest } from '../store/slices/clubsCatalog';

export const ClubsPage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clubsRequest());
  }, [dispatch]);

  return (
    <Layout>
      <Box>
        <Grid
          templateColumns={{ base: 'repeat(1,1fr)', xl: 'repeat(3,1fr)' }}
          gap="8"
        >
          <GridItem display={'flex'} flexDir="column">
            <SearchBox />
            <Box mt={4}>
              <Filters />
            </Box>
          </GridItem>
          <GridItem colSpan={{ base: 1, xl: 2 }}>
            <ClubList
              templateColumns={{ base: 'repeat(1,1fr)', md: 'repeat(2,1fr)' }}
            />
          </GridItem>
        </Grid>
        <Flex mt="8" justify={{ base: 'center', xl: 'end' }}>
          <Pagination />
        </Flex>
      </Box>
    </Layout>
  );
};
