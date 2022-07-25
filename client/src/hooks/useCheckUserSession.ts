import { checkUserSession, useAppDispatch } from '../redux';
import { useCallback } from 'react';

export const useCheckUserSession = () => {
  const dispatch = useAppDispatch();

  const checkSession = useCallback(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return checkSession;
};
