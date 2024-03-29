import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectProfileState = (state) => {
    return state.profile || initialState;
}

export const selectProfile = createSelector(selectProfileState, (state) => state.data);

export const selectTask = createSelector(selectProfileState, (state) => state.myTask);

export const selectTaskManager = createSelector(selectProfileState, (state) => state.managerTask)