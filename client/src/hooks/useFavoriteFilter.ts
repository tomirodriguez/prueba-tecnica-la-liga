import {
  applyFavoriteFilter,
  clubsRequest,
} from '../redux/slices/clubsCatalog';
import { useAppDispatch } from './useAppDispatch';
import { useCallback } from 'react';

export const useFavoriteFilter = () => {
  const dispatch = useAppDispatch();

  const filterFavorite = useCallback(
    (filterFavorite?: boolean) => {
      dispatch(applyFavoriteFilter({ filterFavorite }));
      dispatch(clubsRequest());
    },
    [dispatch]
  );

  return filterFavorite;
};
