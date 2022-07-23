import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getClubs } from '../../services/ClubsServices';
import { authenticate, logout } from '../../services/UserSessionServices';
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
import { clubsRequestSucceeded } from '../slices/clubs';

function* loginUser(action: PayloadAction<LoginRequestActionType>) {
  const { token, error } = yield call(authenticate, action.payload);

  if (token) yield put({ type: loginSucceded, payload: { user: {} } });
  else yield put({ type: loginFailed, payload: { error } });
}

function* checkUser() {
  const { clubs, total } = yield call(getClubs, {});

  if (clubs) {
    yield put({ type: sessionIsOpen });
    yield put({ type: clubsRequestSucceeded, payload: { clubs, total } });
  } else yield put({ type: sessionExpired });
}

function* endSession() {
  yield call(logout);
  yield put({ type: logoutSucceeded });
}

function* userSaga() {
  yield takeLatest(loginRequest, loginUser);
  yield takeLatest(checkUserSession, checkUser);
  yield takeLatest(logoutRequest, endSession);
}

export default userSaga;
