import { produce } from "immer";

import { SET_USER_LIST_DATA } from "./constants";

export const initialState = {
    userListData: {},
};

export const storedKey = [''];

const userListReducer = ( state = initialState, action ) => 
    produce(state, (draft) => {
        switch(action.type) {
            case SET_USER_LIST_DATA:
                draft.userListData = action.userListData;
                break;
        }
    });

export default userListReducer;