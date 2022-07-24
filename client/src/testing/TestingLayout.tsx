import { configureStore } from '@reduxjs/toolkit';
import { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import createSagaMiddleware, { Saga } from 'redux-saga';
import { authReducer, authSlice } from '../redux/slices/auth';
import { clubsCatalogReducer } from '../redux/slices/clubsCatalog';
import {
  clubsCatalogSlice,
  ClubsCatalogState,
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
    total: DUMMY_CLUBS_LIST.length,
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

  if (sagas) sagaMiddleware.run(sagas);

  return <Provider store={store}>{children}</Provider>;
};
