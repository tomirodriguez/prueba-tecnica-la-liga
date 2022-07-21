import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { storeToken } from '../../services';
import { getClubs } from '../../services/ClubsServices';
import { authenticate } from '../../services/UserSessionServices';
import {
  checkUserSession,
  loginFailed,
  loginRequest,
  LoginRequestActionType,
  loginSucceded,
  logout,
  logoutSucceeded,
  sessionExpired,
  sessionIsOpen,
} from '../slices/auth';

function* loginUser(action: PayloadAction<LoginRequestActionType>) {
  const { token, error } = yield call(authenticate, action.payload);

  if (token) {
    yield call(storeToken, token);
    yield put({ type: loginSucceded, payload: { user: {} } });
  } else yield put({ type: loginFailed, payload: { error } });
}

function* checkUser() {
  const { error } = yield call(getClubs);

  if (error) yield put({ type: sessionExpired });
  else yield put({ type: sessionIsOpen });
}

function* endSession() {
  yield call(logout);
  yield put({ type: logoutSucceeded });
}

function* userSaga() {
  yield takeLatest(loginRequest, loginUser);
  yield takeLatest(checkUserSession, checkUser);
  yield takeLatest(logout, endSession);
}

export default userSaga;
