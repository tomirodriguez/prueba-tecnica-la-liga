import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ClubsRequestActionType,
  ClubsRequestFailedActionType,
  ClubsRequestSucceededActionType,
  FilterFavoriteUpdateActionType,
  NameFilterUpdateActionType,
  UpdateClubActionType,
} from '.';
import type { RootState } from '../..';
import { Club } from '../../../model';

export interface ClubsCatalogState {
  loading: boolean;
  clubs: Club[];
  total: number;
  offset: number;
  error: string;
  nameFilter?: string;
  filterFavorite?: boolean;
}

const initialState: ClubsCatalogState = {
  loading: false,
  total: 0,
  offset: 0,
  clubs: [],
  error: '',
};

export const clubsCatalogSlice = createSlice({
  name: 'clubs',
  initialState,
  reducers: {
    clubsRequest: (state, action: PayloadAction<ClubsRequestActionType>) => {
      return {
        ...state,
        loading: true,
        error: '',
      };
    },

    clubsRequestSucceeded: (
      state,
      action: PayloadAction<ClubsRequestSucceededActionType>
    ) => {
      const { clubs, total, offset } = action.payload;
      return {
        ...state,
        loading: false,
        clubs,
        total,
        offset,
      };
    },

    updateNameFilter: (
      state,
      action: PayloadAction<NameFilterUpdateActionType>
    ) => {
      return {
        ...state,
        nameFilter: action.payload.nameFilter,
      };
    },

    updateFavoriteFilter: (
      state,
      action: PayloadAction<FilterFavoriteUpdateActionType>
    ) => {
      return {
        ...state,
        filterFavorite: action.payload.filterFavorite,
      };
    },

    clubsRequestFailed: (
      state,
      action: PayloadAction<ClubsRequestFailedActionType>
    ) => {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    },

    updateClubFromCatalog: (
      state,
      action: PayloadAction<UpdateClubActionType>
    ) => {
      const newClub = action.payload.club;

      return {
        ...state,
        clubs: state.clubs.map((club) =>
          club.id === newClub.id ? newClub : { ...club }
        ),
      };
    },
  },
});

export const {
  clubsRequest,
  clubsRequestSucceeded,
  clubsRequestFailed,
  updateClubFromCatalog,
  updateNameFilter,
  updateFavoriteFilter,
} = clubsCatalogSlice.actions;

export const selectClubsCatalog = (state: RootState) => state.clubs;

export const clubsCatalogReducer = clubsCatalogSlice.reducer;
