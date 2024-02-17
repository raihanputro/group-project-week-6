import { produce } from "immer";

import { SET_TASK_LIST_DATA_MANAGER } from "./constants";

export const initialState = {
    taskListDataManager: {},
};

export const storedKey = ['taskListDataManager'];

const taskListManagerReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SET_TASK_LIST_DATA_MANAGER:
                draft.taskListDataManager = action.taskListDataManager;
                break;
        }
    });

export default taskListManagerReducer;