import { Button, Flex, Radio, RadioGroup, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import {
  clubsRequest,
  updateFavoriteFilter,
} from '../../../store/slices/clubsCatalog';
import {
  favoriteFilter,
  FavoriteFilterType,
  noFavoriteFilter,
  noFilter,
} from './utils';

export const Filters: FC = () => {
  const dispatch = useAppDispatch();
  const [filterFavorite, setFilterFavorite] =
    useState<FavoriteFilterType>(noFilter);

  const handleApplyFilters = () => {
    dispatch(updateFavoriteFilter(filterFavorite.setFilter()));
    dispatch(clubsRequest());
  };

  const removeFilter = () => setFilterFavorite(noFilter);

  const filterByFavorites = () => setFilterFavorite(favoriteFilter);

  const filterWithoutFavorites = () => setFilterFavorite(noFavoriteFilter);

  return (
    <Flex direction={'column'}>
      <Text fontWeight={'bold'} mb="4">
        Filtros
      </Text>
      <RadioGroup defaultValue={filterFavorite.id}>
        <Flex direction="column">
          <Radio value={noFilter.id} onChange={removeFilter}>
            Todos
          </Radio>
          <Radio value={filterFavorite.id} onChange={filterByFavorites}>
            Favoritos
          </Radio>
          <Radio value={noFavoriteFilter.id} onChange={filterWithoutFavorites}>
            No favoritos
          </Radio>
        </Flex>
      </RadioGroup>
      <Button w={'full'} mt={8} onClick={handleApplyFilters}>
        Aplicar
      </Button>
    </Flex>
  );
};