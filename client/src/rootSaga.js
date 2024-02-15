import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import loginSaga from '@pages/Login/saga';
import RegisterSaga from '@pages/Register/saga';
import userListSaga from '@pages/Admin/UserList/saga';
import taskListSaga from '@pages/Admin/TaskList/saga';
import myTaskSaga from '@pages/Member/Home/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    loginSaga(),
    RegisterSaga(),
    userListSaga(),
    taskListSaga(),

    myTaskSaga()
  ]);
}
