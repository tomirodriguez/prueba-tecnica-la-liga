import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import createSagaMiddleware from 'redux-saga';
import mySaga from './sagas/authSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(mySaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
