import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  ping: 'ping.json',
  login: 'login',
  register: 'register',
  userList: 'user/list',
  taskListAdmin: 'task/admin/list',
  createTask : 'task/admin/create',
  deleteTask: 'task/admin/delete',
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
export const login = (dataUser) => callAPI(urls.login, 'POST', {}, {}, dataUser);
export const register = (dataUser) => callAPI(urls.register, 'POST', {}, {}, dataUser);
export const userList = () => callAPI(urls.userList, 'GET');
export const taskListAdmin = () => callAPI(urls.taskListAdmin, 'GET');
export const createTask = (taskData) => callAPI(urls.createTask, 'POST', {}, {}, taskData);
export const deleteTask = (id) => callAPI(`${urls.deleteTask}/${id}`, 'DELETE');
