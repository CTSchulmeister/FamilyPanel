import { combineReducers } from 'redux';

import authReducer from './authReducer';
import viewReducer from './viewReducer';
import householdReducer from './householdReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    view: viewReducer,
    households: householdReducer
});

export default rootReducer;