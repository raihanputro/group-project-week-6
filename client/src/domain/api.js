import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  ping: 'ping.json',
  login: 'login',
  register: 'register',
  getProfile: 'user/my-profile',
  updateProfile: 'user/update-profile',
  changePassword: 'user/change-password'
};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'application/json; charset=UTF-8',
  };

  const headers = merge(defaultHeader, header);
  const options = {
    url: config.api.host + endpoint,
    method,
    headers,
    data,
    params,
  };

  return request(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const ping = () => callAPI(urls.ping, 'get');

export const login = (dataUser) => {
  return callAPI(urls.login, 'POST', {}, {}, dataUser)
};

export const register = (dataUser) => {
  return callAPI(urls.register, 'POST', {}, {}, dataUser);
};

export const getProfile = () => {
  return callAPI(urls.getProfile, 'GET')
};

export const updateProfile = (data) => {
  return callAPI(urls.updateProfile, 'PATCH', {}, {}, data)
};

export const changePassword = (data) => {
  return callAPI(urls.changePassword, 'PATCH', {}, {}, data)
};