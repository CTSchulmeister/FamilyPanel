import { combineReducers } from 'redux';

import userReducer from './userReducer';
import householdReducer from './householdReducer';
import serverReducer from './serverReducer';

const rootReducer = combineReducers({
    user: userReducer,
    households: householdReducer,
    server: serverReducer
});

export default rootReducer;