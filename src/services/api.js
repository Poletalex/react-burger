import { DATA_SOURCE } from '../utils/constants';
import { fetchWithRefresh } from '../utils/utils';

export const logoutRequest = async () => {
  return await fetch(DATA_SOURCE + 'auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const refreshTokenRequest = async () => {
  return await fetchWithRefresh(DATA_SOURCE + 'auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
};