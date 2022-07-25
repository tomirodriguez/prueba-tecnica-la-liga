import { useCallback } from 'react';
import { applyNameFilter, clubsRequest, useAppDispatch } from '../redux';

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
