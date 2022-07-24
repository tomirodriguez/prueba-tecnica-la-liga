import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToggleFavoriteActionType } from '.';
import type { RootState } from '../..';
import { ToggleFavoriteFailedActionType } from './favoriteTogglerActionType';

export interface FavoriteTogglerState {
  loading: boolean;
  clubUpdatedId: string;
  error: string;
}

const initialState: FavoriteTogglerState = {
  loading: false,
  clubUpdatedId: '',
  error: '',
};

export const favoriteTogglerSlice = createSlice({
  name: 'favoriteToggler',
  initialState,
  reducers: {
    toggleClubFavoriteRequest: (
      state,
      action: PayloadAction<ToggleFavoriteActionType>
    ) => {
      return {
        ...state,
        loading: true,
        clubUpdatedId: action.payload.clubId,
        error: '',
      };
    },

    toggleClubFavoriteRequestSuccess: (state) => {
      return {
        ...state,
        loading: false,
        error: '',
      };
    },

    toggleClubFavoriteRequestFailed: (
      state,
      action: PayloadAction<ToggleFavoriteFailedActionType>
    ) => {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    },
  },
});

export const {
  toggleClubFavoriteRequest,
  toggleClubFavoriteRequestSuccess,
  toggleClubFavoriteRequestFailed,
} = favoriteTogglerSlice.actions;

export const selectClubs = (state: RootState) => state.favoriteToggler;

export const favoriteTogglerReducer = favoriteTogglerSlice.reducer;
