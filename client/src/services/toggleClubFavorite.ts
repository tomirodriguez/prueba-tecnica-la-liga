import axios from 'axios';
import {
  CLUB_NOT_FOUND_ERROR,
  INVALID_TOKEN_ERROR,
  UNAUTHORIZED_USER_ERROR,
} from './constants';
import { UpdateClubFavoriteProps, UpdateClubFavoriteResponse } from './types';
import { cleanToken, getToken, simulateDelay } from './utils';

export const updateClubFavorite = async ({
  clubId,
  favorite,
}: UpdateClubFavoriteProps) => {
  const token = getToken();
  const { REACT_APP_API_URL, REACT_APP_MOCK_DELAY } = process.env;

  if (REACT_APP_MOCK_DELAY === 'true') await simulateDelay();

  const response = await axios
    .patch<UpdateClubFavoriteResponse>(
      `api/clubs/${clubId}`,
      {
        favorite,
      },
      {
        baseURL: REACT_APP_API_URL,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      const { id } = response.data;

      if (id && response.data.foundationDate)
        return {
          club: {
            ...response.data,
            foundationDate: new Date(response.data.foundationDate),
          },
        };
      else throw new Error(CLUB_NOT_FOUND_ERROR);
    })
    .catch((error) => {
      if (error.message === CLUB_NOT_FOUND_ERROR)
        return { error: CLUB_NOT_FOUND_ERROR };

      const { status } = error.response;

      if (status === 403) {
        cleanToken();
        return { error: INVALID_TOKEN_ERROR };
      }

      if (status === 401) {
        cleanToken();
        return { error: UNAUTHORIZED_USER_ERROR };
      }

      return { error: 'unknown_error' };
    });

  return response;
};
