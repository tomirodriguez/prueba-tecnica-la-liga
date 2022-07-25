import { useAppSelector } from '.';

export const useClubsCatalogSelector = () => {
  return useAppSelector((state) => state.clubs);
};
