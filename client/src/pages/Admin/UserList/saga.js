import { takeLatest, call, put } from "redux-saga/effects";
import { GET_USER_LIST_DATA } from "./constants";
import { setUserListData } from "./actions";
import { userList } from "@domain/api";
import { showPopup } from "@containers/App/actions";

function* doGetUserList () {
    try {
        const res = yield call(userList);
    
          yield put(setUserListData(res));
    } catch (error) {
        yield put(showPopup());
    }
}

export default function* userListSaga() {
    yield takeLatest(GET_USER_LIST_DATA, doGetUserList);
}