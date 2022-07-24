import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/index';
import { authReducer } from './slices/auth';
import { clubsReducer } from './slices/clubsCatalog/clubsCatalogSlice';
import { favoriteTogglerReducer } from './slices/favoriteToggler/favoriteTogglerSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clubs: clubsReducer,
    favoriteToggler: favoriteTogglerReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
