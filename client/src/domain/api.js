import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  ping: 'ping.json',
  login: 'login',
  register: 'register',
  getProfile: 'user/my-profile',
  updateProfile: 'user/update-profile',
  changePassword: 'user/change-password',
  changeImg: 'user/change-image',
  userList: 'user/list',
  taskListAdmin: 'task/admin/list',
  createTask: 'task/admin/create',

  mytask: 'task/member/list',
  myTaskDetail: 'task/member/detail',

  myTaskManager: 'task/manager/list',
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
  return callAPI(urls.login, 'POST', {}, {}, dataUser);
};

export const register = (dataUser) => {
  return callAPI(urls.register, 'POST', {}, {}, dataUser);
};

export const getProfile = () => {
  return callAPI(urls.getProfile, 'GET');
};

export const updateProfile = (data) => {
  return callAPI(urls.updateProfile, 'PATCH', {}, {}, data);
};

export const changePassword = (data) => {
  return callAPI(urls.changePassword, 'PATCH', {}, {}, data);
};

export const changeImage = (data) => {
  return callAPI(urls.changeImg, 'PATCH', { 'Content-Type': 'multipart/form-data; charset=UTF-8' }, {}, data);
};
export const userList = () => callAPI(urls.userList, 'GET');
export const taskListAdmin = () => callAPI(urls.taskListAdmin, 'GET');
export const createTask = (taskData) => callAPI(urls.createTask, 'POST', {}, {}, taskData);

export const getMyTask = () => callAPI(urls.mytask, 'GET');
export const getMyTaskDetailAPI = (id) => callAPI(`${urls.myTaskDetail}/${id}`, 'GET');

export const getMyTaskManager = () => callAPI(urls.myTaskManager, 'GET');