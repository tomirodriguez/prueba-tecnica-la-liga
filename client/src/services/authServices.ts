import axios from 'axios';
import { AuthenticateType, AuthorizationResponse } from './types';
import { cleanToken, storeToken, simulateDelay } from './utils';
import { INVALID_USER_ERROR } from './constants';

export const authenticate: AuthenticateType = async ({ email, password }) => {
  const { REACT_APP_API_URL, REACT_APP_MOCK_DELAY } = process.env;

  if (REACT_APP_MOCK_DELAY === 'true') await simulateDelay();

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
      const { status } = error.response;
      if (status === 400 || status === 401) {
        return { error: INVALID_USER_ERROR };
      }

      return { error: 'unknown_error' };
    });

  return response;
};

export const logout = async () => {
  cleanToken();
};
