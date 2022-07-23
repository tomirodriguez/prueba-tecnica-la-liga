import { Club } from '../../../model';

export type ClubsRequestActionType = {
  offset: number;
};

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

export type ToggleFavoriteActionType = {
  clubId: string;
  favorite: boolean;
};

export type ToggleFavoriteSuccessActionType = {
  clubId: string;
  favorite: boolean;
};

export type ToggleFavoriteFailedActionType = {
  error: string;
};

export type UpdateClubActionType = {
  club: Club;
};
