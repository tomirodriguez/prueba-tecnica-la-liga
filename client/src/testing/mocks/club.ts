import { Club } from '../../model';
import { ApiClub } from '../../services/types';

const foundationDate = new Date();

export const DUMMY_CLUB: Club = {
  id: 'an_id',
  name: 'Un Club',
  foundationDate: foundationDate,
  avatar: 'una_imagen',
  favorite: false,
};

export const DUMMY_CLUB_API_RESPONSE: ApiClub = {
  id: 'an_id',
  name: 'Un Club',
  foundationDate: foundationDate.toISOString(),
  avatar: 'una_imagen',
  favorite: false,
};
