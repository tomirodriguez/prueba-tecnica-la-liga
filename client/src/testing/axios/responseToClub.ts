import { ApiClub } from '../../services/types';

export const responseToClub = (clubsFromApi: ApiClub[]) =>
  clubsFromApi.map((apiClub) => ({
    ...apiClub,
    foundationDate: new Date(apiClub.foundationDate),
  }));
