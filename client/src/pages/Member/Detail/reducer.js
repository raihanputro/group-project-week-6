import { produce } from 'immer';
import { SET_MY_TASK_DETAIL, SET_MY_MEMBER } from './constants';

export const initialState = {
  myTaskDetail: [],
  myTaskMember: [],
};

export const storedKey = ['myTaskDetail','myTaskMember'];

const myTaskDetailReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_MY_TASK_DETAIL:
        draft.myTaskDetail = action.myTaskDetail;
        break;
      case SET_MY_MEMBER:
        draft.myTaskMember = action.myTaskMember;
        break;
      default:
        break;
    }
  });

export default myTaskDetailReducer;
