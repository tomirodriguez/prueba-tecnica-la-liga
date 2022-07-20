import axios from 'axios';
import { AuthenticateType, AuthorizationResponse } from './types';

export const authenticate: AuthenticateType = async ({ email, password }) => {
  const { REACT_APP_API } = process.env;
  const response = await axios
    .post<AuthorizationResponse>(
      'login',
      { email, password },
      {
        baseURL: REACT_APP_API,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )
    .then((response) => {
      const { token } = response.data;

      return { token: token };
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        return { error: 'invalid_user' };
      }

      return { error: 'unknown_error' };
    });

  return response;
};
