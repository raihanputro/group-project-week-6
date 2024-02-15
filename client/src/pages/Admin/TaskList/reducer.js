import { produce } from "immer";

import { SET_TASK_LIST_DATA } from "./constants";

export const initialState = {
    taskListData: {},
};

export const storedKey = [''];

const taskListReducer = ( state = initialState, action ) => 
    produce(state, (draft) => {
        switch(action.type) {
            case SET_TASK_LIST_DATA:
                draft.taskListData = action.taskListData;
                break;
        }
    });

export default taskListReducer;