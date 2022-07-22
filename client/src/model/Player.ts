import { Stats } from '.';

export type Player = {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  clubId: string;
  stats: Stats[];
};
