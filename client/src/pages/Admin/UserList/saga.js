import { takeLatest, call, put } from "redux-saga/effects";
import { GET_USER_LIST_DATA } from "./constants";
import { setUserListData } from "./actions";
import { allUser } from "@domain/api";
import { setLoading, showPopup } from "@containers/App/actions";

function* doGetUserList () {
    yield put(setLoading(true));
    try {
        const res = yield call(allUser);
      
          yield put(setUserListData(res));
    } catch (error) {
        yield put(showPopup());
    }
    yield put(setLoading(false));
}

export default function* userListSaga() {
    yield takeLatest(GET_USER_LIST_DATA, doGetUserList);
}