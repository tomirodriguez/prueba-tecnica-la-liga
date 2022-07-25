import { Club } from '../../../model';

export type ClubsRequestActionType =
  | {
      offset?: number;
      limit?: number;
    }
  | undefined;

export type ClubsRequestSucceededActionType = {
  clubs: Club[];
  total: number;
  offset: number;
};

export type NameFilterUpdateActionType = {
  nameFilter?: string;
};

export type FilterFavoriteUpdateActionType = {
  filterFavorite?: boolean;
};

export type ClubsRequestFailedActionType = {
  error: string;
};

export type UpdateClubActionType = {
  club: Club;
};
