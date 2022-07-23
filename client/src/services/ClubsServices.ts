import axios from 'axios';
import { cleanToken, getToken } from './TokenHandler';
import { GetClubsProps, GetClubsResponse } from './types';

export const getClubs = async ({
  limit = 6,
  offset = 0,
  nameFilter = '',
}: GetClubsProps) => {
  const { REACT_APP_API_URL } = process.env;
  const token = getToken();

  if (!token) return { error: 'unauthorized_user' };

  const response = await axios
    .get<GetClubsResponse>('api/clubs', {
      params: {
        limit,
        offset: 0,
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
        return { error: 'unauthorized_user' };
      }

      return { error: 'unknown_error' };
    });

  return response;
};
