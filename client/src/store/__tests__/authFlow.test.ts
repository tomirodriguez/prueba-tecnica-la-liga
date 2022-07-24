import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import SagaTester from 'redux-saga-tester';
import {
  INVALID_USER_ERROR,
  INVALID_TOKEN_ERROR,
} from '../../services/constants';
import userSaga from '../sagas/userSaga';
import {
  authReducer,
  AuthState,
  checkUserSession,
  loginFailed,
  loginRequest,
  loginSucceded,
  logoutRequest,
  logoutSucceeded,
  sessionExpired,
  sessionIsOpen,
} from '../slices/auth';

const axiosMock = new MockAdapter(axios);

describe('<authStore and authSaga>', () => {
  afterEach(() => {
    axiosMock.reset();
  });

  it('should be able to login a user with the correct credentials', async () => {
    const token = 'esto_es_un_token';

    axiosMock.onPost('/login').reply(200, { token });

    const sagaTester = new SagaTester<AuthState>({
      initialState: {
        checkingSession: false,
        error: '',
        loading: false,
        user: null,
      },
      reducers: authReducer,
    });

    sagaTester.start(userSaga);
    sagaTester.dispatch(loginRequest({ email: '', password: '' }));

    expect(sagaTester.store.getState().loading).toBe(true);

    const lastAction = await sagaTester.waitFor(loginSucceded.type);

    expect(lastAction).toStrictEqual(loginSucceded({ user: {} }));
    expect(sagaTester.store.getState().loading).toBe(false);
    expect(sagaTester.store.getState().user).toStrictEqual({});
  });

  it('should not be able to login an user if the credentials are not correct', async () => {
    axiosMock.onPost('/login').reply(400, { message: 'Invalid user' });

    const sagaTester = new SagaTester<AuthState>({
      initialState: {
        checkingSession: false,
        error: '',
        loading: false,
        user: null,
      },
      reducers: authReducer,
    });

    sagaTester.start(userSaga);
    sagaTester.dispatch(loginRequest({ email: '', password: '' }));

    expect(sagaTester.store.getState().loading).toBe(true);

    const lastAction = await sagaTester.waitFor(loginFailed.type);

    expect(lastAction).toStrictEqual(
      loginFailed({ error: INVALID_USER_ERROR })
    );
    expect(sagaTester.store.getState().loading).toBe(false);
    expect(sagaTester.store.getState().user).toBe(null);
  });

  it('should be able to end a user session', async () => {
    axiosMock.onPost('/api/clubs').reply(200, { message: 'Invalid user' });
    const sagaTester = new SagaTester<AuthState>({
      initialState: {
        checkingSession: false,
        error: '',
        loading: false,
        user: {},
      },
      reducers: authReducer,
    });

    sagaTester.start(userSaga);
    sagaTester.dispatch(logoutRequest());

    expect(sagaTester.store.getState().loading).toBe(true);

    const lastAction = await sagaTester.waitFor(logoutSucceeded.type);

    expect(lastAction).toStrictEqual(logoutSucceeded());
    expect(sagaTester.store.getState().loading).toBe(false);
    expect(sagaTester.store.getState().user).toBe(null);
  });

  it('should be able to tell if user session is open', async () => {
    axiosMock.onGet('/api/clubs').reply(200, { results: [], total: 0 });
    const sagaTester = new SagaTester<AuthState>({
      initialState: {
        checkingSession: false,
        error: '',
        loading: false,
        user: null,
      },
      reducers: authReducer,
    });

    sagaTester.start(userSaga);
    sagaTester.dispatch(checkUserSession());

    expect(sagaTester.store.getState().checkingSession).toBe(true);

    const lastAction = await sagaTester.waitFor(sessionIsOpen.type);

    expect(lastAction).toStrictEqual(sessionIsOpen({ user: {} }));
    expect(sagaTester.store.getState().checkingSession).toBe(false);
    expect(sagaTester.store.getState().user).toStrictEqual({});
  });

  it('should be able to tell if the user session is not open', async () => {
    axiosMock.onGet('/api/clubs').reply(403, { error: INVALID_TOKEN_ERROR });
    const sagaTester = new SagaTester<AuthState>({
      initialState: {
        checkingSession: false,
        error: '',
        loading: false,
        user: null,
      },
      reducers: authReducer,
    });

    sagaTester.start(userSaga);
    sagaTester.dispatch(checkUserSession());

    expect(sagaTester.store.getState().checkingSession).toBe(true);

    const lastAction = await sagaTester.waitFor(sessionExpired.type);

    expect(lastAction).toStrictEqual(sessionExpired());
    expect(sagaTester.store.getState().checkingSession).toBe(false);
    expect(sagaTester.store.getState().user).toBe(null);
  });
});
