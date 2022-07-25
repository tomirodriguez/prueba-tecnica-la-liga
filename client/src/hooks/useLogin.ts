import { useCallback } from 'react';
import { loginRequest } from '../redux/slices/auth';
import { useAppDispatch } from './useAppDispatch';

export const useLogin = () => {
  const dispatch = useAppDispatch();

  const login = useCallback(
    (email: string, password: string) => {
      dispatch(loginRequest({ email, password }));
    },
    [dispatch]
  );

  return login;
};
