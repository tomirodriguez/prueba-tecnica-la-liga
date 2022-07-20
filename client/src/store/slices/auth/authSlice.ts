import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../..';
import { LoginRequestActionType, LoginFailActionType } from './authActionType';

interface AuthState {
  loading: boolean;
  success: boolean;
  error: string;
}

const initialState: AuthState = {
  loading: false,
  success: false,
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state, action: PayloadAction<LoginRequestActionType>) => {
      return { ...state, loading: true };
    },

    loginSucceded: (state) => {
      return {
        ...state,
        loading: false,
        success: true,
        error: '',
      };
    },

    loginFailed: (state, action: PayloadAction<LoginFailActionType>) => {
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload.error,
      };
    },
  },
});

export const { loginRequest, loginSucceded, loginFailed } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
