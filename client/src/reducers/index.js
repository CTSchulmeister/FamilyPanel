import { combineReducers } from 'redux';

import authReducer from './authReducer';
import viewReducer from './viewReducer';
import householdReducer from './householdReducer';
import eventReducer from './eventReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    view: viewReducer,
    households: householdReducer,
    events: eventReducer
});

export default rootReducer;