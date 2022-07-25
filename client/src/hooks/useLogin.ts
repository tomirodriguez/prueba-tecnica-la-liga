import { useCallback } from 'react';
import { useAppDispatch, loginRequest } from '../redux';

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
