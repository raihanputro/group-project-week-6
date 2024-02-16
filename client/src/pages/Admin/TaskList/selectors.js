import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectTaskListState = (state) => state.taskList || initialState;

export const selectTaskListData = createSelector(selectTaskListState, (state) => state.taskListData);
export const selectTaskDetailData = createSelector(selectTaskListState, (state) => state.taskDetailData);
