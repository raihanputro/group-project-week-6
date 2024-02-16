    import { takeLatest, call, put } from "redux-saga/effects";
    import { GET_TASK_LIST_DATA, CREATE_TASK, DELETE_TASK } from "./constants";
    import { setTaskListData } from "./actions";
    import { taskListAdmin, createTask, deleteTask } from "@domain/api";
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
    };

    function* doDeleteTask ({id}) {
        try {
            yield call(deleteTask, id);
            const res = yield call(taskListAdmin);
            yield put(setTaskListData(res));
        } catch (error) {
            yield put(showPopup(error))
        }
    }

    export default function* taskListSaga() {
        yield takeLatest(GET_TASK_LIST_DATA, doGetTaskList);
        yield takeLatest(CREATE_TASK, doPostTask);
        yield takeLatest(DELETE_TASK, doDeleteTask);
    }