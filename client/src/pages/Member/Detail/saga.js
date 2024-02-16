import { takeLatest, call, put } from 'redux-saga/effects';

import { setLoading } from '@containers/App/actions';
import { setMyTaskDetail } from './actions';
import { GET_MY_TASK_DETAIL } from './constants';
import { getMyTaskDetailAPI } from '@domain/api';

function* doFetchMyDetailTask({ id, cb }) {
  yield put(setLoading(true));
  try {
    const data = yield call(getMyTaskDetailAPI, id);
    yield put(setMyTaskDetail(data?.response));
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
}