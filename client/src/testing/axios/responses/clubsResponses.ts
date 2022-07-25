import { CLUBS_DB } from '../mocks';

type GetMockedClubsParams = {
  limit?: number;
  offset?: number;
  name_like?: string;
  favorite?: boolean;
};

type GetMockedClubsOptions = {
  maxClubs?: number;
};

export const getMockedClubs = (
  params?: GetMockedClubsParams,
  options?: GetMockedClubsOptions
) => {
  const { limit = 6, offset = 0, name_like, favorite } = params || {};
  const { maxClubs } = options || {};

  let { results } = CLUBS_DB;

  if (maxClubs) results = results.slice(0, maxClubs);

  if (name_like)
    results = results.filter((club) =>
      club.name.toLowerCase().includes(name_like.toLowerCase())
    );

  if (favorite === true) results = results.filter((club) => club.favorite);
  if (favorite === false) results = results.filter((club) => !club.favorite);

  return {
    total: results.length,
    results: results.slice(offset, offset + limit),
  };
};
