import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectTaskListState = (state) => {
    return state.managerTaskList || initialState
};

export const selectTaskListDataManager = createSelector(selectTaskListState, (state) => state.taskListDataManager);
