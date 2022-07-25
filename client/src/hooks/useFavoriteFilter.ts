import { useCallback } from 'react';
import { useAppDispatch, applyFavoriteFilter, clubsRequest } from '../redux';

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
