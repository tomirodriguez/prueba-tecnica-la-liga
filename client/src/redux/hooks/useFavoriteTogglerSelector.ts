import { useAppSelector } from '.';

export const useFavoriteTogglerSelector = () => {
  return useAppSelector((state) => state.favoriteToggler);
};
