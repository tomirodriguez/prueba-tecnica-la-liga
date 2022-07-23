import { Club } from '../../../model';

export type ClubsRequestActionType = {
  offset?: number;
  limit?: number;
  nameFilter?: string;
  filterFavorite?: boolean;
};

export type ClubsRequestSucceededActionType = {
  clubs: Club[];
  total: number;
};

export type ClubsRequestFailedActionType = {
  error: string;
};
