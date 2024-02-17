import { takeLatest, call, put } from "redux-saga/effects";
import { CREATE_TASK_MANAGER, GET_TASK_LIST_DATA_MANAGER } from "./constants";
import { setTaskListManagerData } from "./actions";
import { taskListAdmin, createTask, getMyTaskManager } from "@domain/api";
import { showPopup } from "@containers/App/actions";

function* doGetTaskList() {
    try {
        const res = yield call(getMyTaskManager);
        yield put(setTaskListManagerData(res));
    } catch (error) {
        yield put(showPopup());
    }
};

function* doPostTask({ taskData }) {
    try {
        yield call(createTask, taskData);
        const res = yield call(getMyTaskManager);
        yield put(setTaskListManagerData(res));
    } catch (error) {
        yield put(showPopup(error))
    }
}

export default function* taskListManagerSaga() {
    yield takeLatest(GET_TASK_LIST_DATA_MANAGER, doGetTaskList);
    yield takeLatest(CREATE_TASK_MANAGER, doPostTask);
}