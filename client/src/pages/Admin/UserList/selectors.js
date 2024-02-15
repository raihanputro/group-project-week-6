import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectUserListState = (state) => state.userList || initialState;

export const selectUserListData = createSelector(selectUserListState, (state) => state.userListData);
