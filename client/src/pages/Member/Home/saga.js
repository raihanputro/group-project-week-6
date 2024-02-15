import { takeLatest, call, put } from 'redux-saga/effects';

import { setLoading, showPopup } from '@containers/App/actions';
import { setMyTask } from './actions';
import { FETCH_MYTASK } from './constants';
import { getMyTask } from '@domain/api';

function* doFetchMyTask() {
  yield put(setLoading(true));
  try {
    const data = yield call(getMyTask);
    console.log(data.response)
    yield put(setMyTask(data.response));
  } catch (error) {
    yield put(showPopup(error.info));
  }
  yield put(setLoading(false));
}

export default function* myTaskSaga() {
  yield takeLatest(FETCH_MYTASK, doFetchMyTask);
}