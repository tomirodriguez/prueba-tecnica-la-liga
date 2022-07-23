import axios from 'axios';
import { UNAUTHORIZED_USER_ERROR } from './constants';
import { cleanToken, getToken } from './TokenHandler';
import { GetClubsProps, GetClubsResponse } from './types';
import { simulateDelay } from './utils';

export const getClubs = async ({
  limit = 6,
  offset = 0,
  nameFilter = '',
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
      if (axios.isAxiosError(error) && error.status === '400') {
        cleanToken();
        return { error: UNAUTHORIZED_USER_ERROR };
      }

      return { error: 'unknown_error' };
    });

  return response;
};
