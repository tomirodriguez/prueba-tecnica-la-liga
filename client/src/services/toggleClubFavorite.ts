import axios from 'axios';
import { Club } from '../model';
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
  const { REACT_APP_API_URL } = process.env;
  const token = getToken();

  await simulateDelay();

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

      if (id) return { club: response.data as Club };
      else throw new Error(CLUB_NOT_FOUND_ERROR);
    })
    .catch((error) => {
      const { status } = error.response;

      if (error.message === CLUB_NOT_FOUND_ERROR)
        return { error: CLUB_NOT_FOUND_ERROR };

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
