import { produce } from "immer";
import { GET_PROFILE, SET_PASSWORD, SET_PROFILE, SET_STEP } from "./constant";

export const initialState = {
    step: 1,
    data: {},
    dataPassword: {},
};

export const storedKey = ['data'];

const profileReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SET_STEP:
                draft.step = action.step
                break;
            case GET_PROFILE:
                draft.data = action.data
                break;
            case SET_PROFILE:
                draft.data = action.data
                break;
            default:
                break;
        }
    });
export default profileReducer;