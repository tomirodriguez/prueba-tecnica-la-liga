import { Club } from '../model';

export type AuthorizationResponse = {
  token: string;
};

export type AuthorizationFailed = {
  satus: number;
  message: string;
};

export type AuthorizationInput = {
  email: string;
  password: string;
};

export type AuthenticateType = ({
  email,
  password,
}: AuthorizationInput) => Promise<{
  token?: string;
  error?: string;
}>;

export type GetClubsResponse = { results: Club[]; total: number };

export type GetClubsProps = {
  limit?: number;
  offset?: number;
  nameFilter?: string;
};
