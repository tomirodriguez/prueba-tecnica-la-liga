import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../..';
import { Club } from '../../../model';

interface ClubsState {
  loading: boolean;
  clubs: Club[];
  error: string;
}

const initialState: ClubsState = {
  loading: false,
  clubs: [],
  error: '',
};

export const clubsSlice = createSlice({
  name: 'clubs',
  initialState,
  reducers: {
    getClubs: (state) => {
      return { ...state };
    },
  },
});

export const { getClubs } = clubsSlice.actions;

export const selectClubs = (state: RootState) => state.auth;

export const clubsReducer = clubsSlice.reducer;
