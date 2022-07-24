import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/index';
import { authReducer } from './slices/auth';
import { clubsCatalogReducer } from './slices/clubsCatalog/clubsCatalogSlice';
import { favoriteTogglerReducer } from './slices/favoriteToggler/favoriteTogglerSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  clubs: clubsCatalogReducer,
  favoriteToggler: favoriteTogglerReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: {
      auth: authReducer,
      clubs: clubsCatalogReducer,
      favoriteToggler: favoriteTogglerReducer,
    },
    preloadedState,
    middleware: [sagaMiddleware],
  });

  sagaMiddleware.run(rootSaga);

  return store;
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
