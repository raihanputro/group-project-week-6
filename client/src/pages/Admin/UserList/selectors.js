import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectUserListtate = (state) => state.userList || initialState;

export const selectUserListData = createSelector(selectUserListtate, (state) => state.userListData);
