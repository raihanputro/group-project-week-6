import { takeLatest, call, put } from "redux-saga/effects";
import { SET_TASK_LIST_DATA, GET_TASK_LIST_DATA, CREATE_TASK } from "./constants";
import { setTaskListData } from "./actions";
import { taskListAdmin, createTask } from "@domain/api";
import { showPopup } from "@containers/App/actions";

function* doGetTaskList () {
    try {
        const res = yield call(taskListAdmin);
        yield put(setTaskListData(res));
    } catch (error) {
        yield put(showPopup());
    }
};

function* doPostTask ({taskData}) {
    try {
        yield call(createTask, taskData);
        const res = yield call(taskListAdmin);
        yield put(setTaskListData(res));
    } catch (error) {
        yield put(showPopup(error))
    }
}

export default function* taskListSaga() {
    yield takeLatest(GET_TASK_LIST_DATA, doGetTaskList);
    yield takeLatest(CREATE_TASK, doPostTask);
}