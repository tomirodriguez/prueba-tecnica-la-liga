import { useAppSelector } from './useAppSelector';

export const useClubsSelector = () => {
  return useAppSelector((state) => state.clubs);
};
