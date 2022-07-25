import { useCallback } from 'react';
import { toggleClubFavoriteRequest, useAppDispatch } from '../redux';

export const useFavoriteToggler = () => {
  const dispatch = useAppDispatch();

  const toggleFavorite = useCallback(
    (clubId: string, favorite: boolean) => {
      dispatch(toggleClubFavoriteRequest({ clubId, favorite }));
    },
    [dispatch]
  );

  return toggleFavorite;
};
