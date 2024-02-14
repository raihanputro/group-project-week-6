import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  ping: 'ping.json',
  login: 'login',
  register: 'register',
  allUser: 'user/list'
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
}

export const register = (dataUser) => {
  return callAPI(urls.register, 'POST', {}, {}, dataUser);
}

export const allUser = () => callAPI(urls.allUser, 'GET');