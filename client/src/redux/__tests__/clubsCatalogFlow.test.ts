import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import SagaTester from 'redux-saga-tester';
import { INVALID_TOKEN_ERROR } from '../../services/constants';
import { DUMMY_CLUB, DUMMY_CLUB_API_RESPONSE } from '../../testing/mocks/club';
import { clubsSaga } from '../sagas/clubsSaga';
import {
  clubsCatalogReducer,
  clubsCatalogSlice,
  ClubsCatalogState,
  clubsRequest,
  clubsRequestFailed,
  clubsRequestSucceeded,
} from '../slices/clubsCatalog/clubsCatalogSlice';

const axiosMock = new MockAdapter(axios);

describe('<clubsCatalogSlice and clubsSaga>', () => {
  afterEach(() => {
    axiosMock.reset();
  });

  it('should be able to get the clubs from de api', async () => {
    const apiResponse = { results: [DUMMY_CLUB_API_RESPONSE], total: 1 };
    axiosMock.onGet('/api/clubs').reply(200, apiResponse);

    const sagaTester = new SagaTester<ClubsCatalogState>({
      initialState: clubsCatalogSlice.getInitialState(),
      reducers: clubsCatalogReducer,
    });

    sagaTester.start(clubsSaga);
    sagaTester.dispatch(clubsRequest({ limit: 6, offset: 0 }));

    expect(sagaTester.store.getState().loading).toBe(true);

    const lastAction = await sagaTester.waitFor(clubsRequestSucceeded.type);

    expect(lastAction).toStrictEqual(
      clubsRequestSucceeded({ clubs: [DUMMY_CLUB], total: 1, offset: 0 })
    );
    expect(sagaTester.store.getState().loading).toBe(false);
    expect(sagaTester.store.getState().clubs).toStrictEqual([DUMMY_CLUB]);
    expect(sagaTester.store.getState().total).toStrictEqual(1);
    expect(sagaTester.store.getState().offset).toStrictEqual(0);
  });

  it('should not be able to get the clubs from de api if the user is not authorized', async () => {
    axiosMock.onGet('/api/clubs').reply(403, { message: INVALID_TOKEN_ERROR });

    const sagaTester = new SagaTester<ClubsCatalogState>({
      initialState: clubsCatalogSlice.getInitialState(),
      reducers: clubsCatalogReducer,
    });

    sagaTester.start(clubsSaga);
    sagaTester.dispatch(clubsRequest({ limit: 6, offset: 0 }));

    expect(sagaTester.store.getState().loading).toBe(true);

    const lastAction = await sagaTester.waitFor(clubsRequestFailed.type);

    expect(lastAction).toStrictEqual(
      clubsRequestFailed({ error: INVALID_TOKEN_ERROR })
    );
    expect(sagaTester.store.getState().loading).toBe(false);
    expect(sagaTester.store.getState().clubs).toStrictEqual([]);
    expect(sagaTester.store.getState().total).toStrictEqual(0);
    expect(sagaTester.store.getState().offset).toStrictEqual(0);
  });
});
