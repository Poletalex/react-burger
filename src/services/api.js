import { getCookie } from './utils';

export const loginRequest = async form => {
  return await fetch('login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  });
};

export const getUserRequest = async () =>
  await fetch('api/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    }
  });

export const logoutRequest = async () => {
  return await fetch('logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
};