import { User } from '../../../model';

export type LoginRequestActionType = {
  email: string;
  password: string;
};

export type LoginFailActionType = {
  error: string;
};

export type LoginSuccessActionType = {
  user: User;
};

export type SessionIsOpenActionType = {
  user: User;
};
