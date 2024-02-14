import { produce } from "immer";
import { GET_PROFILE, SET_PROFILE } from "./constant";

export const initialState = {
    data: {}
};

export const storedKey = ['data'];

const profileReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
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