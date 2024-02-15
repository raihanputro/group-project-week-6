import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectProfileState = (state) => {
    return state.profile || initialState;
}

export const selectProfile = createSelector(selectProfileState, (state) => state.data)