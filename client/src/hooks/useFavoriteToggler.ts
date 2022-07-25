import { useCallback } from 'react';
import { toggleClubFavoriteRequest } from '../redux/slices/favoriteToggler';
import { useAppDispatch } from './useAppDispatch';

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
