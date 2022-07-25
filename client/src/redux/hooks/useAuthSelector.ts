import { useAppSelector } from '.';

export const useAuthSelector = () => {
  return useAppSelector((state) => state.auth);
};
