import {
  Box,
  Collapse,
  Flex,
  List,
  ListItem,
  useMediaQuery,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../../hooks/useAppDispatch';
import {
  clubsRequest,
  applyFavoriteFilter,
} from '../../../../../redux/slices/clubsCatalog';
import { FilterHeader } from './components';

import {
  favoriteFilter,
  FavoriteFilterType,
  noFavoriteFilter,
  noFilter,
} from './utils';

export const Filters: FC = () => {
  const dispatch = useAppDispatch();
  const [isXl] = useMediaQuery('(min-width: 1280px)');
  const [showFilters, setshowFilters] = useState(false);
  const [filterFavorite, setFilterFavorite] =
    useState<FavoriteFilterType>(noFilter);

  const toggleFilters = () => {
    setshowFilters(!showFilters);
  };

  useEffect(() => {
    if (isXl) setshowFilters(true);
    else setshowFilters(false);
  }, [isXl]);

  const handleFavoriteChange = (filter: FavoriteFilterType) => {
    dispatch(applyFavoriteFilter(filter.setFilter()));
    dispatch(clubsRequest());
    setFilterFavorite(filter);
  };

  return (
    <Flex direction="column">
      <FilterHeader onClick={toggleFilters} isShowingFilters={showFilters} />
      <Collapse in={showFilters}>
        <List title="Favorite filter">
          {[noFilter, favoriteFilter, noFavoriteFilter].map((filter) => (
            <ListItem key={filter.id} ml={4}>
              <Box
                maxW={200}
                py={1}
                cursor={'pointer'}
                fontSize={'lg'}
                fontWeight={filterFavorite.id === filter.id ? 'bold' : 'normal'}
                color={
                  filterFavorite.id === filter.id ? 'secondary.main' : 'text'
                }
                onClick={() => handleFavoriteChange(filter)}
              >
                {filter.label}
              </Box>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Flex>
  );
};
