import { GET_TASK_LIST_DATA_MANAGER, SET_TASK_LIST_DATA_MANAGER, CREATE_TASK_MANAGER } from "./constants";

export const getTaskListManagerData = () => ({
    type: GET_TASK_LIST_DATA_MANAGER,
});

export const setTaskListManagerData = (taskListDataManager) => ({
    type: SET_TASK_LIST_DATA_MANAGER,
    taskListDataManager
});

export const createTaskManager = (taskData) => ({
    type: CREATE_TASK_MANAGER,
    taskData
})