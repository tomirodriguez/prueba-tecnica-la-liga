import axios from 'axios';
import { AuthenticateType, AuthorizationResponse } from './types';
import { cleanToken, storeToken } from './TokenHandler';

export const authenticate: AuthenticateType = async ({ email, password }) => {
  const { REACT_APP_API_URL } = process.env;
  const response = await axios
    .post<AuthorizationResponse>(
      'login',
      { email, password },
      {
        baseURL: REACT_APP_API_URL,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )
    .then((response) => {
      const { token } = response.data;
      storeToken(token);
      return { token: token };
    })
    .catch((error) => {
      if (axios.isAxiosError(error) && error.status === '400') {
        return { error: 'invalid_user' };
      }

      return { error: 'unknown_error' };
    });

  return response;
};

export const logout = () => {
  cleanToken();
};
