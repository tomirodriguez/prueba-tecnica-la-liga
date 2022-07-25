import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToggleFavoriteActionType, ToggleFavoriteFailedActionType } from '.';
import type { RootState } from '../..';

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

export const selectFavoriteToggler = (state: RootState) =>
  state.favoriteToggler;

export const favoriteTogglerReducer = favoriteTogglerSlice.reducer;
