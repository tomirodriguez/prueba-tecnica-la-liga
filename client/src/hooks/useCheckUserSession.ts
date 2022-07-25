import { checkUserSession } from '../redux/slices/auth';
import { useAppDispatch } from './useAppDispatch';
import { useCallback } from 'react';

export const useCheckUserSession = () => {
  const dispatch = useAppDispatch();

  const checkSession = useCallback(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return checkSession;
};
