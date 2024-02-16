import { GET_TASK_LIST_DATA, SET_TASK_LIST_DATA, GET_TASK_DETAIL_DATA, SET_TASK_DETAIL_DATA, CREATE_TASK, UPDATE_TASK, DELETE_TASK } from "./constants"; 

export const getTaskListData = () => ({
    type: GET_TASK_LIST_DATA,
});

export const getTaskDetailData = (id) => ({
    type: GET_TASK_DETAIL_DATA,
    id
});

export const setTaskListData = (taskListData) => ({
    type: SET_TASK_LIST_DATA,
    taskListData
});

export const setTaskDetailData = (taskDetailData) => ({
    type: SET_TASK_DETAIL_DATA,
    taskDetailData
})

export const createTask = (taskData) => ({
    type: CREATE_TASK,
    taskData
});

export const updateTask = (id, taskData) => ({
    type: UPDATE_TASK,
    id,
    taskData
});

export const deleteTask = (id) => ({
    type: DELETE_TASK,
    id
})