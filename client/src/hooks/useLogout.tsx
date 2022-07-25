import { useCallback } from 'react';
import { logoutRequest } from '../redux/slices/auth';
import { useAppDispatch } from './useAppDispatch';

export const useLogout = () => {
  const dispatch = useAppDispatch();

  const logout = useCallback(() => {
    dispatch(logoutRequest());
  }, [dispatch]);

  return logout;
};
