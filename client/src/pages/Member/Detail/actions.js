import { GET_MY_TASK_DETAIL, SET_MY_TASK_DETAIL } from "./constants";

export const getMyTaskDetail = (id,cb) => ({
    type: GET_MY_TASK_DETAIL,
    id,
    cb
});

export const setMyTaskDetail = (myTaskDetail) => ({
    type: SET_MY_TASK_DETAIL,
    myTaskDetail
})