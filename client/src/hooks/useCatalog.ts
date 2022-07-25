import { useCallback } from 'react';
import { clubsRequest, ClubsRequestActionType, useAppDispatch } from '../redux';

export const useCatalog = () => {
  const dispatch = useAppDispatch();

  const getClubsFromCatalog = useCallback(
    (props?: ClubsRequestActionType) => {
      dispatch(clubsRequest(props));
    },
    [dispatch]
  );

  return getClubsFromCatalog;
};
