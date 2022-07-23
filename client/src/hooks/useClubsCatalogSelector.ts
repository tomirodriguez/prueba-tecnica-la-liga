import { useAppSelector } from './useAppSelector';

export const useClubsCatalogSelector = () => {
  return useAppSelector((state) => state.clubs);
};
