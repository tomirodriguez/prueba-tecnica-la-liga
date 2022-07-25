import { useAppSelector } from './useAppSelector';

export const useFavoriteTogglerSelector = () => {
  return useAppSelector((state) => state.favoriteToggler);
};
