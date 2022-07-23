import axios from 'axios';
import { UNAUTHORIZED_USER_ERROR } from './constants';
import { GetClubsProps, GetClubsResponse } from './types';
import { cleanToken, getToken, simulateDelay } from './utils';
import { PAGINATION_LIMIT } from '../constants';

export const getClubs = async ({
  limit = PAGINATION_LIMIT,
  offset = 0,
  nameFilter = '',
  filterFavorite,
}: GetClubsProps) => {
  const { REACT_APP_API_URL } = process.env;
  const token = getToken();

  if (!token) return { error: UNAUTHORIZED_USER_ERROR };

  await simulateDelay();

  const response = await axios
    .get<GetClubsResponse>('api/clubs', {
      params: {
        limit,
        offset,
        name_like: nameFilter,
        favorite: filterFavorite,
      },
      baseURL: REACT_APP_API_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const { results, total } = response.data;

      return { clubs: results, total };
    })
    .catch((error) => {
      if (axios.isAxiosError(error) && error.status === '401') {
        cleanToken();
        return { error: UNAUTHORIZED_USER_ERROR };
      }

      return { error: 'unknown_error' };
    });

  return response;
};
