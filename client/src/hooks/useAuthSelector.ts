import { useAppSelector } from './useAppSelector';

export const useAuthSelector = () => {
  return useAppSelector((state) => state.auth);
};
