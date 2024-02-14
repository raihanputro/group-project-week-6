import { setLoading } from "@containers/App/actions";
import { call } from "redux-saga/effects";

function* getProfileUser(){
    yield put(setLoading(true))
    try {
        const response = yield call();
        
    } catch (error) {
        
    }
}