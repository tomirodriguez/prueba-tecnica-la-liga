import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { authenticate, getClubs, logout } from '../../services';
import {
  checkUserSession,
  loginFailed,
  loginRequest,
  LoginRequestActionType,
  loginSucceded,
  logoutRequest,
  logoutSucceeded,
  sessionExpired,
  sessionIsOpen,
} from '../slices/auth';

export function* loginUser(action: PayloadAction<LoginRequestActionType>) {
  const { token, error } = yield call(authenticate, action.payload);

  if (token) yield put(loginSucceded({ user: {} }));
  else yield put(loginFailed({ error }));
}

export function* checkUser() {
  const { error } = yield call(getClubs, {});

  if (!error) yield put(sessionIsOpen({ user: {} }));
  else yield put(sessionExpired());
}

export function* endSession() {
  yield call(logout);
  yield put(logoutSucceeded());
}

function* userSaga() {
  yield takeLatest(loginRequest, loginUser);
  yield takeLatest(checkUserSession, checkUser);
  yield takeLatest(logoutRequest, endSession);
}

export { userSaga };
