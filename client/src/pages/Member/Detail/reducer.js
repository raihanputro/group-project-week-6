import { produce } from 'immer';
import { SET_MY_TASK_DETAIL } from './constants';

export const initialState = {
  myTaskDetail: {},
};

export const storedKey = ['myTaskDetail'];

const myTaskDetailReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_MY_TASK_DETAIL:
        draft.myTaskDetail = action.myTaskDetail;
        break;
      default:
        break;
    }
  });

export default myTaskDetailReducer;
