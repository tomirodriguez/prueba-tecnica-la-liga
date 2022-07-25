import { useCallback } from 'react';
import {
  clubsRequest,
  ClubsRequestActionType,
} from '../redux/slices/clubsCatalog';
import { useAppDispatch } from './useAppDispatch';

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
