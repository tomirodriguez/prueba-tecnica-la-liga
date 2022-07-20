import { call, put, takeLatest } from 'redux-saga/effects';
import { authenticate } from '../../services/authenticate';
import {
  loginFailed,
  loginRequest,
  loginSucceded,
} from '../slices/auth/authSlice';

function* loginUser(action: any) {
  const { token, error } = yield call(authenticate, action.payload);

  if (token) yield put({ type: loginSucceded });
  else yield put({ type: loginFailed, payload: { error } });
}

function* authSaga() {
  yield takeLatest(loginRequest, loginUser);
}

export default authSaga;
