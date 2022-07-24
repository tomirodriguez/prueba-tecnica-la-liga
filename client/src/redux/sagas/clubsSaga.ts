import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getClubs, updateClubFavorite } from '../../services';
import { sessionExpired } from '../slices/auth';
import {
  clubsRequest,
  ClubsRequestActionType,
  clubsRequestFailed,
  clubsRequestSucceeded,
  ClubsState,
  selectClubsCatalog,
  updateClubFromCatalog,
} from '../slices/clubsCatalog';
import {
  toggleClubFavorite,
  toggleClubFavoriteRequestFailed,
  toggleClubFavoriteRequestSuccess,
} from '../slices/favoriteToggler';
import { ToggleFavoriteActionType } from '../slices/favoriteToggler/favoriteTogglerActionType';
import { isSessionExpiredError } from './utils/isSessionExpiredError';

function* fetchClubs(action: PayloadAction<ClubsRequestActionType>) {
  const { nameFilter, filterFavorite }: ClubsState = yield select(
    selectClubsCatalog
  );

  const { clubs, total, error } = yield call(getClubs, {
    ...action.payload,
    nameFilter,
    filterFavorite,
  });

  if (!error)
    yield put(
      clubsRequestSucceeded({
        clubs,
        total,
        offset: action.payload?.offset || 0,
      })
    );
  else if (isSessionExpiredError(error)) yield put(sessionExpired());
  else yield put(clubsRequestFailed({ error }));
}

function* toggleFavorite(action: PayloadAction<ToggleFavoriteActionType>) {
  const { club, error } = yield call(updateClubFavorite, action.payload);

  if (club) {
    yield put(toggleClubFavoriteRequestSuccess());
    yield put(updateClubFromCatalog({ club }));
  } else if (isSessionExpiredError(error)) yield put(sessionExpired());
  else yield put(toggleClubFavoriteRequestFailed({ error }));
}

function* clubsSaga() {
  yield takeLatest(clubsRequest, fetchClubs);
  yield takeLatest(toggleClubFavorite, toggleFavorite);
}

export default clubsSaga;
