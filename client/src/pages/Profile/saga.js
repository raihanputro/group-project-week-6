import { setLoading } from "@containers/App/actions";
import { call, put, takeLatest } from "redux-saga/effects";
import { GET_PROFILE, UPDATE_PROFILE } from "./constant";
import { getProfile, updateProfile } from "@domain/api";
import { setProfile } from "./action";

function* getProfileUser() {
    yield put(setLoading(true))
    try {
        const response = yield call(getProfile);
        yield put(setProfile(response?.response))
    } catch (error) {
        console.log(error)
    }
    yield put(setLoading(false))
}

function* doUpdateProfile({ data, cb }) {
    yield put(setLoading(true))
    try {
        yield call(updateProfile, data);
        const response = yield call(getProfile);
        yield put(setProfile(response?.response))
        cb && cb();
    } catch (error) {
        console.log(error)
    }
    yield put(setLoading(false))
}

export default function* profileSaga() {
    yield takeLatest(GET_PROFILE, getProfileUser)
    yield takeLatest(UPDATE_PROFILE, doUpdateProfile)
}