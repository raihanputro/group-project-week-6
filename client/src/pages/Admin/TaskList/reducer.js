import { produce } from "immer";

import { SET_TASK_LIST_DATA, SET_TASK_DETAIL_DATA } from "./constants";

export const initialState = {
    taskListData: {},
    taskDetailData: {}
};  

export const storedKey = ['taskListData'];

const taskListReducer = ( state = initialState, action ) => 
    produce(state, (draft) => {
        switch(action.type) {
            case SET_TASK_LIST_DATA:
                draft.taskListData = action.taskListData;
                break;
            case SET_TASK_DETAIL_DATA:
                draft.taskDetailData = action.taskDetailData;
                break;
        }
    });

export default taskListReducer;