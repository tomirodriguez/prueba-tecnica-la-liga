import { configureStore } from '@reduxjs/toolkit';
import { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createSagaMiddleware, { Saga } from 'redux-saga';
import { authReducer } from '../redux/slices/auth';
import { clubsCatalogReducer } from '../redux/slices/clubsCatalog';
import { favoriteTogglerReducer } from '../redux/slices/favoriteToggler';

type Props = {
  sagas?: Saga;
};

export const TestingLayout: FC<PropsWithChildren<Props>> = ({
  children,
  sagas,
}) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: {
      auth: authReducer,
      clubs: clubsCatalogReducer,
      favoriteToggler: favoriteTogglerReducer,
    },
    middleware: [sagaMiddleware],
  });

  if (sagas) sagaMiddleware.run(sagas);

  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};
