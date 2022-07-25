import { AXIOS_GET_CLUBS_DEFAULT_RESPONSE } from './axiosGetClubsDefaultResponse';

const results = AXIOS_GET_CLUBS_DEFAULT_RESPONSE.results.filter(
  (club) => !club.favorite
);

export const AXIOS_GET_CLUBS_DEFAULT_NOT_FAVORITE_RESPONSE = {
  results,
  total: results.length,
};
