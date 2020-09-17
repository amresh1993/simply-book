import { combineReducers } from "redux";

import { loginReducer, postListReducer, reloadReducer, pendingTabReducer } from './reducers';

// if there is more than one reducer you can combine and sent to the store.
export default combineReducers({ loginReducer, postListReducer, reloadReducer, pendingTabReducer });