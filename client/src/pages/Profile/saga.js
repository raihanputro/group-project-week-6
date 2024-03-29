import { setLoading } from "@containers/App/actions";
import { call, put, takeLatest } from "redux-saga/effects";
import { GET_MANAGER_TASK, GET_PROFILE, GET_TASK, SET_IMAGE, SET_PASSWORD, UPDATE_PROFILE } from "./constant";
import { changeImage, changePassword, getMyTask, getMyTaskManager, getProfile, updateProfile } from "@domain/api";
import { getTask, setProfile, setTask, setTaskManager } from "./action";
import toast from "react-hot-toast";

function* getProfileUser() {
    yield put(setLoading(true))
    try {
        const response = yield call(getProfile);
        yield put(setProfile(response?.response))
    } catch (error) {
        // console.log(error)
    }
    yield put(setLoading(false))
}

function* doUpdateProfile({ data, cb }) {
    yield put(setLoading(true))
    try {
        yield call(updateProfile, data);
        toast.success('Update Profile Success')
        const response = yield call(getProfile);
        yield put(setProfile(response?.response))
        cb && cb();
    } catch (error) {
        // console.log(error)
        toast.error(error?.response?.data?.message)
    }
    yield put(setLoading(false))
};

function* doChangePassword({ data, cb }) {
    yield put(setLoading(true))
    try {
        yield call(changePassword, data)
        toast.success('Change Password Success')
        cb && cb();
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
    yield put(setLoading(false))
};

function* doUpdateImage({ formData, cb }) {
    yield put(setLoading(true))
    try {
        yield call(changeImage, formData);
        cb && cb();
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
    yield put(setLoading(false))
};

function* getTaskUser() {
    yield put(setLoading(true))
    try {
        const response = yield call(getMyTask);
        yield put(setTask(response?.response))
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
    yield put(setLoading(false))
};

function* getTaskManager() {
    yield put(setLoading(true))
    try {
        const response = yield call(getMyTaskManager);
        yield put(setTaskManager(response?.response))
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
    yield put(setLoading(false))
}

export default function* profileSaga() {
    yield takeLatest(GET_PROFILE, getProfileUser)
    yield takeLatest(UPDATE_PROFILE, doUpdateProfile)
    yield takeLatest(SET_PASSWORD, doChangePassword)
    yield takeLatest(SET_IMAGE, doUpdateImage)
    yield takeLatest(GET_TASK, getTaskUser)
    yield takeLatest(GET_MANAGER_TASK, getTaskManager)
}