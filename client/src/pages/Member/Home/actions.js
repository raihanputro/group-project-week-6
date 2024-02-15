import { FETCH_MYTASK, SET_MYTASK } from './constants';

export const getFetchMyTask = () => ({
  type: FETCH_MYTASK,
});

export const setMyTask = (myTask) => ({
  type: SET_MYTASK,
  myTask,
});