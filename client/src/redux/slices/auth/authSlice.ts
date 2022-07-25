import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  LoginFailActionType,
  LoginRequestActionType,
  LoginSuccessActionType,
  SessionIsOpenActionType,
} from '.';
import type { RootState } from '../..';
import { User } from '../../../model';

export interface AuthState {
  checkingSession: boolean;
  loading: boolean;
  user: User | null;
  error: string;
}

const initialState: AuthState = {
  checkingSession: true,
  loading: false,
  user: null,
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state, action: PayloadAction<LoginRequestActionType>) => {
      return { ...state, loading: true, error: '' };
    },

    loginSucceded: (state, action: PayloadAction<LoginSuccessActionType>) => {
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      };
    },

    loginFailed: (state, action: PayloadAction<LoginFailActionType>) => {
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload.error,
      };
    },

    checkUserSession: (state) => {
      return {
        ...state,
        checkingSession: true,
      };
    },

    sessionExpired: (state) => {
      return {
        ...state,
        checkingSession: false,
        user: null,
      };
    },

    sessionIsOpen: (state, action: PayloadAction<SessionIsOpenActionType>) => {
      return {
        ...state,
        checkingSession: false,
        user: action.payload.user,
      };
    },

    logoutRequest: (state) => {
      return {
        ...state,
        loading: true,
      };
    },

    logoutSucceeded: (state) => {
      return {
        ...state,
        loading: false,
        user: null,
      };
    },
  },
});

export const {
  loginRequest,
  loginSucceded,
  loginFailed,
  checkUserSession,
  sessionExpired,
  sessionIsOpen,
  logoutRequest,
  logoutSucceeded,
} = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export const authReducer = authSlice.reducer;
