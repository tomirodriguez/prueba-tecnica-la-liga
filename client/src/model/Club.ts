import { Player } from '.';

export type Club = {
  id: string;
  name: string;
  foundationDate: Date;
  avatar: string;
  favorite: boolean;
  players: Player[];
};