import { combineReducers } from 'redux';

import authReducer from './authReducer';
import viewReducer from './viewReducer';
import householdReducer from './householdReducer';
import eventReducer from './eventReducer';
import noteReducer from './noteReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    view: viewReducer,
    households: householdReducer,
    events: eventReducer,
    notes: noteReducer
});

export default rootReducer;