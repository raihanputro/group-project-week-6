import { produce } from "immer";
import { GET_PROFILE, GET_TASK, SET_PASSWORD, SET_PROFILE, SET_STEP, SET_TASK } from "./constant";

export const initialState = {
    step: 1,
    data: {},
    myTask: []
};

export const storedKey = ['step', 'data', 'myTask'];

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
            case GET_TASK:
                draft.myTask = action.myTask
                break;
            case SET_TASK:
                draft.myTask = action.dataTask
                break;
            default:
                break;
        }
    });
export default profileReducer;