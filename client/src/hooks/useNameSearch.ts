import { applyNameFilter, clubsRequest } from '../redux/slices/clubsCatalog';
import { useAppDispatch } from './useAppDispatch';
import { useCallback } from 'react';

export const useNameFilter = () => {
  const dispatch = useAppDispatch();

  const filterByName = useCallback(
    (nameFilter?: string) => {
      dispatch(applyNameFilter({ nameFilter }));
      dispatch(clubsRequest());
    },
    [dispatch]
  );

  return filterByName;
};
