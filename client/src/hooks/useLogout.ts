import { useCallback } from 'react';
import { useAppDispatch, logoutRequest } from '../redux';

export const useLogout = () => {
  const dispatch = useAppDispatch();

  const logout = useCallback(() => {
    dispatch(logoutRequest());
  }, [dispatch]);

  return logout;
};
