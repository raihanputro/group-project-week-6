import { GET_PROFILE, SET_PROFILE } from "./constant";

export const getProfile = () => ({
    type: GET_PROFILE
});

export const setProfile = (data) => ({
    type: SET_PROFILE,
    data
});