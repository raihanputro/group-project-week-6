import { takeLatest, call, put } from 'redux-saga/effects';

import { setLoading } from '@containers/App/actions';
import { setMyMember, setMyTaskDetail } from './actions';
import { GET_MY_MEMBER, GET_MY_TASK_DETAIL } from './constants';
import { getMyMemberAPI, getMyTaskDetailAPI } from '@domain/api';

function* doFetchMyDetailTask({ id, cb }) {
  yield put(setLoading(true));
  try {
    const data = yield call(getMyTaskDetailAPI, id);
    yield put(setMyTaskDetail(data?.data));
  } catch (error) {
    if (error?.response?.status === 404) {
      cb();
    } else {
      cb();
    }
  }
  yield put(setLoading(false));
}

function* doFetchMyTaskMember({ id, cb }) {
  yield put(setLoading(true));
  try {
    const data = yield call(getMyMemberAPI, id);
    yield put(setMyMember(data?.data));
  } catch (error) {
    if (error?.response?.status === 404) {
      cb();
    } else {
      cb();
    }
  }
  yield put(setLoading(false));
}

export default function* myTaskDetailSaga() {
  yield takeLatest(GET_MY_TASK_DETAIL, doFetchMyDetailTask);
  yield takeLatest(GET_MY_MEMBER, doFetchMyTaskMember);
}