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
  offset: number;
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
