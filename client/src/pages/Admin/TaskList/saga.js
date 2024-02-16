    import { takeLatest, call, put } from "redux-saga/effects";
    import { GET_TASK_LIST_DATA, GET_TASK_DETAIL_DATA, CREATE_TASK, UPDATE_TASK, DELETE_TASK } from "./constants";
    import { setTaskListData, setTaskDetailData } from "./actions";
    import { taskListAdmin, taskDetailAdmin, createTask, updateTaskAdmin, deleteTask } from "@domain/api";
    import { showPopup } from "@containers/App/actions";

    function* doGetTaskList () {
        try {
            const res = yield call(taskListAdmin);
            yield put(setTaskListData(res));
            console.log(res, 'anjg')
        } catch (error) {
            yield put(showPopup());
        }
    };

    function* doGetTaskDetail ({id}) {
        try {
            const resTaskDetail = yield call(taskDetailAdmin, id);
            console.log(resTaskDetail, 'dwed');
            yield put(setTaskDetailData(resTaskDetail));
        } catch (error) {
            yield put(showPopup(error));
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

    function* doUpdateTask ({id, taskData}) {
        try {
            yield call(updateTaskAdmin, id, taskData);
            console.log(taskData, 'll')
            const res = yield call(taskListAdmin);
            yield put(setTaskListData(res));
        } catch (error) {
            yield put(showPopup(error));
        }
    }
    

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
        yield takeLatest(GET_TASK_DETAIL_DATA, doGetTaskDetail);
        yield takeLatest(CREATE_TASK, doPostTask);
        yield takeLatest(UPDATE_TASK, doUpdateTask);
        yield takeLatest(DELETE_TASK, doDeleteTask);
    }