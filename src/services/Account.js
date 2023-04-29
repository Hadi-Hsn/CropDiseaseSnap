import API from './api';

export const signIn = (data) => {
  return API.post('Account/login', data);
};

export const signUp = (data) => {
  return API.post('Account/registerMember', data);
};
