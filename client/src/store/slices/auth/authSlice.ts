import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../..';
import { User } from '../../../model';
import {
  LoginRequestActionType,
  LoginFailActionType,
  LoginSuccessActionType,
} from './authActionType';

interface AuthState {
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
      return { ...state, loading: true };
    },

    loginSucceded: (state, action: PayloadAction<LoginSuccessActionType>) => {
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        error: '',
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

    sessionIsOpen: (state) => {
      return {
        ...state,
        checkingSession: false,
        user: {},
      };
    },

    logout: (state) => {
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
  logout,
  logoutSucceeded,
} = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export const authReducer = authSlice.reducer;
