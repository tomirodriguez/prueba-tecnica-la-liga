import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import clubsSaga from './clubsSaga';

export function* rootSaga() {
  yield all([userSaga(), clubsSaga()]);
}
