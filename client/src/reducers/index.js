import { combineReducers } from 'redux';

import userReducer from './userReducer';
import householdReducer from './householdReducer';

const rootReducer = combineReducers({
    user: userReducer,
    households: householdReducer
});

export default rootReducer;