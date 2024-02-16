import { GET_PROFILE, GET_TASK, SET_IMAGE, SET_PASSWORD, SET_PROFILE, SET_STEP, SET_TASK, UPDATE_PROFILE } from "./constant";

export const setStep = (step) => ({
    type: SET_STEP,
    step
})

export const getProfile = () => ({
    type: GET_PROFILE
});

export const setProfile = (data) => ({
    type: SET_PROFILE,
    data
});

export const updateProfile = (data, cb) => ({
    type: UPDATE_PROFILE,
    data,
    cb
});

export const changePassword = (data, cb) => ({
    type: SET_PASSWORD,
    data,
    cb
});

export const changeImage = (formData) => ({
    type: SET_IMAGE,
    formData
});

export const getTask = () => ({
    type: GET_TASK
});

export const setTask = (data) => ({
    type: SET_TASK,
    data
})