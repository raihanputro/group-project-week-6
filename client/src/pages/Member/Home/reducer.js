import { produce } from "immer";
import { SET_MYTASK } from "./constants";

export const initialState = {
  myTask: {},
};

export const storedKey = ['myTask'];

const myTaskReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_MYTASK:
        draft.myTask = action.myTask;
        break;
      default:
        break;
    }
  });

export default myTaskReducer;