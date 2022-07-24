import { configureStore, PayloadAction } from '@reduxjs/toolkit';
import { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import createSagaMiddleware, { Saga } from 'redux-saga';
import { delay, put, takeLatest } from 'redux-saga/effects';
import { Club } from '../model';
import { authReducer, authSlice } from '../redux/slices/auth';
import {
  clubsCatalogReducer,
  ClubsRequestActionType,
} from '../redux/slices/clubsCatalog';
import {
  clubsCatalogSlice,
  ClubsCatalogState,
  clubsRequest,
  clubsRequestSucceeded,
} from '../redux/slices/clubsCatalog/clubsCatalogSlice';
import { favoriteTogglerReducer } from '../redux/slices/favoriteToggler';
import { favoriteTogglerSlice } from '../redux/slices/favoriteToggler/favoriteTogglerSlice';
import { DUMMY_CLUBS_LIST } from './mocks';

type Props = {
  sagas?: Saga;
  preloadClubsState?: Partial<ClubsCatalogState>;
};

export const TestingLayout: FC<PropsWithChildren<Props>> = ({
  children,
  sagas,
  preloadClubsState,
}) => {
  const sagaMiddleware = createSagaMiddleware();

  const clubsMockedInfo = {
    clubs: DUMMY_CLUBS_LIST,
    total: 20,
    loading: false,
  };

  const store = configureStore({
    reducer: {
      auth: authReducer,
      clubs: clubsCatalogReducer,
      favoriteToggler: favoriteTogglerReducer,
    },
    preloadedState: {
      clubs: {
        ...clubsCatalogSlice.getInitialState(),
        ...clubsMockedInfo,
        ...preloadClubsState,
      },
      auth: authSlice.getInitialState(),
      favoriteToggler: favoriteTogglerSlice.getInitialState(),
    },
    middleware: [sagaMiddleware],
  });

  function* fetchClubs(action: PayloadAction<ClubsRequestActionType>) {
    const filterFavorite = store.getState().clubs.filterFavorite;
    yield delay(200);

    let clubs: Club[] = [];

    switch (filterFavorite) {
      case false:
        clubs = DUMMY_CLUBS_LIST.filter((club) => !club.favorite);
        break;
      case true:
        clubs = DUMMY_CLUBS_LIST.filter((club) => club.favorite);
        break;
      default:
        clubs = DUMMY_CLUBS_LIST;
    }

    yield put(
      clubsRequestSucceeded({
        clubs: clubs,
        total: clubs.length,
        offset: 0,
      })
    );
  }

  function* filterClubs() {
    yield takeLatest(clubsRequest, fetchClubs);
  }

  if (sagas) sagaMiddleware.run(sagas || filterClubs);

  return <Provider store={store}>{children}</Provider>;
};
