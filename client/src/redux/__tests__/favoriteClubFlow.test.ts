import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { CombinedState, combineReducers } from 'redux';
import SagaTester from 'redux-saga-tester';
import { DUMMY_CLUB, DUMMY_CLUB_API_RESPONSE } from '../../testing/mocks/club';
import { clubsSaga } from '../sagas/clubsSaga';
import { clubsCatalogSlice, ClubsCatalogState } from '../slices/clubsCatalog';
import { clubsCatalogReducer } from '../slices/clubsCatalog/clubsCatalogSlice';
import {
  favoriteTogglerReducer,
  FavoriteTogglerState,
  toggleClubFavoriteRequest,
  toggleClubFavoriteRequestSuccess,
} from '../slices/favoriteToggler';
import {
  favoriteTogglerSlice,
  toggleClubFavoriteRequestFailed,
} from '../slices/favoriteToggler/favoriteTogglerSlice';
import {
  CLUB_NOT_FOUND_ERROR,
  INVALID_TOKEN_ERROR,
} from '../../services/constants';

const axiosMock = new MockAdapter(axios);

type SagaTesterType = CombinedState<{
  favoriteToggler: FavoriteTogglerState;
  clubs: ClubsCatalogState;
}>;

describe('<favoriteTogglerSlice and clubsSaga>', () => {
  afterEach(() => {
    axiosMock.reset();
  });

  it('should be able to toggle a club favorite', async () => {
    const apiResponse = { ...DUMMY_CLUB_API_RESPONSE, favorite: true };
    axiosMock
      .onPatch(`/api/clubs/${DUMMY_CLUB_API_RESPONSE.id}`, { favorite: true })
      .reply(200, apiResponse);

    const sagaTester = new SagaTester<SagaTesterType>({
      initialState: {
        favoriteToggler: favoriteTogglerSlice.getInitialState(),
        clubs: {
          ...clubsCatalogSlice.getInitialState(),
          clubs: [DUMMY_CLUB],
          total: 1,
        },
      },
      reducers: combineReducers({
        favoriteToggler: favoriteTogglerReducer,
        clubs: clubsCatalogReducer,
      }),
    });

    sagaTester.start(clubsSaga);
    sagaTester.dispatch(
      toggleClubFavoriteRequest({ clubId: DUMMY_CLUB.id, favorite: true })
    );

    expect(sagaTester.store.getState().favoriteToggler.loading).toBe(true);

    const lastAction = await sagaTester.waitFor(
      toggleClubFavoriteRequestSuccess.type
    );

    expect(lastAction).toStrictEqual(toggleClubFavoriteRequestSuccess());
    expect(sagaTester.store.getState().clubs.clubs).toContainEqual({
      ...DUMMY_CLUB,
      favorite: true,
    });
    expect(sagaTester.store.getState().clubs.total).toStrictEqual(1);
  });

  it('should not be able to toggle a club favorite if the requested id does not exists', async () => {
    axiosMock
      .onPatch(`/api/clubs/${DUMMY_CLUB_API_RESPONSE.id}_wrong`, {
        favorite: true,
      })
      .reply(200, {});

    const sagaTester = new SagaTester<SagaTesterType>({
      initialState: {
        favoriteToggler: favoriteTogglerSlice.getInitialState(),
        clubs: {
          ...clubsCatalogSlice.getInitialState(),
          clubs: [DUMMY_CLUB],
          total: 1,
        },
      },
      reducers: combineReducers({
        favoriteToggler: favoriteTogglerReducer,
        clubs: clubsCatalogReducer,
      }),
    });

    sagaTester.start(clubsSaga);
    sagaTester.dispatch(
      toggleClubFavoriteRequest({
        clubId: `${DUMMY_CLUB.id}_wrong`,
        favorite: true,
      })
    );

    expect(sagaTester.store.getState().favoriteToggler.loading).toBe(true);

    const lastAction = await sagaTester.waitFor(
      toggleClubFavoriteRequestFailed.type
    );

    expect(lastAction).toStrictEqual(
      toggleClubFavoriteRequestFailed({ error: CLUB_NOT_FOUND_ERROR })
    );
    expect(sagaTester.store.getState().clubs.clubs).toContainEqual({
      ...DUMMY_CLUB,
    });
    expect(sagaTester.store.getState().clubs.total).toStrictEqual(1);
  });

  it('should not be able to toggle a club favorite with an invalid token', async () => {
    axiosMock
      .onPatch(`/api/clubs/${DUMMY_CLUB_API_RESPONSE.id}`, {
        favorite: true,
      })
      .reply(403, { message: INVALID_TOKEN_ERROR });

    const sagaTester = new SagaTester<SagaTesterType>({
      initialState: {
        favoriteToggler: favoriteTogglerSlice.getInitialState(),
        clubs: {
          ...clubsCatalogSlice.getInitialState(),
          clubs: [DUMMY_CLUB],
          total: 1,
        },
      },
      reducers: combineReducers({
        favoriteToggler: favoriteTogglerReducer,
        clubs: clubsCatalogReducer,
      }),
    });

    sagaTester.start(clubsSaga);
    sagaTester.dispatch(
      toggleClubFavoriteRequest({
        clubId: `${DUMMY_CLUB.id}`,
        favorite: true,
      })
    );

    expect(sagaTester.store.getState().favoriteToggler.loading).toBe(true);

    const lastAction = await sagaTester.waitFor(
      toggleClubFavoriteRequestFailed.type
    );

    expect(lastAction).toStrictEqual(
      toggleClubFavoriteRequestFailed({ error: INVALID_TOKEN_ERROR })
    );
    expect(sagaTester.store.getState().clubs.clubs).toContainEqual({
      ...DUMMY_CLUB,
    });
    expect(sagaTester.store.getState().clubs.total).toStrictEqual(1);
  });
});
