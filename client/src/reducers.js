import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import languageReducer from '@containers/Language/reducer';
import userListReducer, { storedKey as storedUserListState } from '@pages/Admin/UserList/reducer';
import taskListReducer, { storedKey as storedTaskListState } from '@pages/Admin/TaskList/reducer';
import myTaskReducer, { storedKey as storedMyTask } from '@pages/Member/Home/reducer';

import { mapWithPersistor } from './persistence';

const storedReducers = {
  app: { reducer: appReducer, whitelist: storedAppState },
  client: { reducer: clientReducer, whitelist: storedClientState },
  userList: { reducer: userListReducer, whitelist: storedUserListState },
  taskList: { reducer: taskListReducer, whitelist: storedTaskListState },

  myTask: {reducer: myTaskReducer, whitelist: storedMyTask}
};

const temporaryReducers = {
  language: languageReducer,
};

const createReducer = () => {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
  });
  const rootReducer = (state, action) => coreReducer(state, action);
  return rootReducer;
};

export default createReducer;
