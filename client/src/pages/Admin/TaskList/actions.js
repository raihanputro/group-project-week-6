import { GET_TASK_LIST_DATA, SET_TASK_LIST_DATA, CREATE_TASK, DELETE_TASK } from "./constants"; 

export const getTaskListData = () => ({
    type: GET_TASK_LIST_DATA,
});

export const setTaskListData = (taskListData) => ({
    type: SET_TASK_LIST_DATA,
    taskListData
});

export const createTask = (taskData) => ({
    type: CREATE_TASK,
    taskData
});

export const deleteTask = (id) => ({
    type: DELETE_TASK,
    id
})