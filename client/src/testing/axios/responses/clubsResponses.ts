import { CLUBS_DB } from '../mocks';

type GetMockedClubsProps = {
  limit?: number;
  offset?: number;
  name_like?: string;
  favorite?: boolean;
};

export const getMockedClubs = ({
  limit = 6,
  offset = 0,
  name_like,
  favorite,
}: GetMockedClubsProps) => {
  let { results } = CLUBS_DB;

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
