import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClubsRequestActionType, ClubsRequestSucceededActionType } from '.';
import type { RootState } from '../..';
import { Club } from '../../../model';
import { ClubsRequestFailedActionType } from './clubsActionType';

interface ClubsState {
  loading: boolean;
  clubs: Club[];
  total: number;
  error: string;
}

const initialState: ClubsState = {
  loading: false,
  total: 0,
  clubs: [],
  error: '',
};

export const clubsSlice = createSlice({
  name: 'clubs',
  initialState,
  reducers: {
    clubsRequest: (state, action: PayloadAction<ClubsRequestActionType>) => {
      return { ...state, loading: true, error: '' };
    },

    clubsRequestSucceeded: (
      state,
      action: PayloadAction<ClubsRequestSucceededActionType>
    ) => {
      return {
        ...state,
        loading: false,
        clubs: action.payload.clubs,
        total: action.payload.total,
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
  },
});

export const { clubsRequest, clubsRequestSucceeded, clubsRequestFailed } =
  clubsSlice.actions;

export const selectClubs = (state: RootState) => state.auth;

export const clubsReducer = clubsSlice.reducer;
