import {
  UNAUTHORIZED_USER_ERROR,
  INVALID_TOKEN_ERROR,
} from '../../../services';

export const isSessionExpiredError = (error: string) => {
  return error === UNAUTHORIZED_USER_ERROR || error === INVALID_TOKEN_ERROR;
};
