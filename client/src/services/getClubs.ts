import axios from 'axios';
import { PAGINATION_LIMIT } from '../constants';
import { INVALID_TOKEN_ERROR } from './constants';
import { GetClubsProps, GetClubsResponse } from './types';
import { getToken, simulateDelay } from './utils';

export const getClubs = async ({
  limit = PAGINATION_LIMIT,
  offset = 0,
  nameFilter = '',
  filterFavorite,
}: GetClubsProps) => {
  const token = getToken();
  const { REACT_APP_API_URL, REACT_APP_MOCK_DELAY } = process.env;

  if (REACT_APP_MOCK_DELAY === 'true') await simulateDelay();

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

      const clubs = results.map((club) => ({
        ...club,
        foundationDate: new Date(club.foundationDate),
      }));

      return {
        clubs,
        total,
      };
    })
    .catch((error) => {
      const { status } = error.response;

      if (status === 403) {
        return { error: INVALID_TOKEN_ERROR };
      }

      return { error: 'unknown_error' };
    });

  return response;
};
