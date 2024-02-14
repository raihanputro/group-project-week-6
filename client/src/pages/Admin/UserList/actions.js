import { GET_USER_LIST_DATA, SET_USER_LIST_DATA } from "./constants"; 

export const getUserListData = () => ({
    type: GET_USER_LIST_DATA,
});

export const setUserListData = (userListData) => ({
    type: SET_USER_LIST_DATA,
    userListData
});