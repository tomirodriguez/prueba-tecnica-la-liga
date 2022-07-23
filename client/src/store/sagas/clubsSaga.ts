import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getClubs, UNAUTHORIZED_USER_ERROR } from '../../services';
import { sessionExpired } from '../slices/auth';
import {
  clubsRequest,
  ClubsRequestActionType,
  clubsRequestFailed,
  clubsRequestSucceeded,
} from '../slices/clubs';

function* fetchClubs(action: PayloadAction<ClubsRequestActionType>) {
  const { clubs, total, error } = yield call(getClubs, action.payload);

  if (!error)
    yield put({ type: clubsRequestSucceeded, payload: { clubs, total } });
  else if (error === UNAUTHORIZED_USER_ERROR)
    yield put({ type: sessionExpired });
  else yield put({ type: clubsRequestFailed, payload: { error } });
}

function* clubsSaga() {
  yield takeLatest(clubsRequest, fetchClubs);
}

export default clubsSaga;
