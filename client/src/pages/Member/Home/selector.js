import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectmyTaskState = (state) => state.myTask || initialState;

export const selectmyTask = createSelector(selectmyTaskState, (state) => state.myTask);