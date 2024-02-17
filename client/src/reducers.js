import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import profileReducer, { storedKey as storedProfileState } from '@pages/Profile/reducer';
import userListReducer, { storedKey as storedUserListState } from '@pages/Admin/UserList/reducer';
import taskListReducer, { storedKey as storedTaskListState } from '@pages/Admin/TaskList/reducer';
import myTaskReducer, { storedKey as storedMyTask } from '@pages/Member/Home/reducer';
import myTaskDetailReducer, { storedKey as storedMyDetailTask } from '@pages/Member/Detail/reducer';
import taskListManagerReducer, { storedKey as storedTaskListManagerState } from '@pages/Manager/TaskList/reducer';

import languageReducer from '@containers/Language/reducer';
import { mapWithPersistor } from './persistence';

const storedReducers = {
  app: { reducer: appReducer, whitelist: storedAppState },
  client: { reducer: clientReducer, whitelist: storedClientState },
  profile: { reducer: profileReducer, whitelist: storedProfileState },
  userList: { reducer: userListReducer, whitelist: storedUserListState },
  taskList: { reducer: taskListReducer, whitelist: storedTaskListState },

  myTask: { reducer: myTaskReducer, whitelist: storedMyTask },
  myTaskDetail: { reducer: myTaskDetailReducer, whitelist: storedMyDetailTask },

  managerTaskList: { reducer: taskListManagerReducer, whitelist: storedTaskListManagerState }
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
