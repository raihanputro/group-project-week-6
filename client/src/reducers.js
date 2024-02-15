import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import profileReducer, { storedKey as storedProfileState } from '@pages/Profile/reducer';
import userListReducer, { storedKey as storedUserListState } from '@pages/Admin/UserList/reducer';
import taskListReducer, { storedKey as storedTaskListState } from '@pages/Admin/TaskList/reducer';

import languageReducer from '@containers/Language/reducer';
import { mapWithPersistor } from './persistence';

const storedReducers = {
  app: { reducer: appReducer, whitelist: storedAppState },
  client: { reducer: clientReducer, whitelist: storedClientState },
  profile: { reducer: profileReducer, whitelist: storedProfileState },
  userList: { reducer: userListReducer, whitelist: storedUserListState },
  taskList: { reducer: taskListReducer, whitelist: storedTaskListState },
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
