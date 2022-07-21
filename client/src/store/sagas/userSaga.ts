import { call, put, takeLatest } from 'redux-saga/effects';
import { storeToken } from '../../services';
import { authenticate } from '../../services/UserSessionServices';
import { loginFailed, loginRequest, loginSucceded } from '../slices/auth';

function* loginUser(action: any) {
  const { token, error } = yield call(authenticate, action.payload);

  if (token) {
    yield call(storeToken, token);
    yield put({ type: loginSucceded, payload: { user: {} } });
  } else yield put({ type: loginFailed, payload: { error } });
}

function* userSaga() {
  yield takeLatest(loginRequest, loginUser);
}

export default userSaga;
