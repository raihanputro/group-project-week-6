import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMyTaskDetailState = (state) => state.myTaskDetail || initialState;

export const selectMyTaskDetail = createSelector(selectMyTaskDetailState, (state) => state.myTaskDetail)