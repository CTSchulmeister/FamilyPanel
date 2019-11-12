import { combineReducers } from 'redux';

import userReducer from './userReducer';
import householdReducer from './householdReducer';
import serverReducer from './serverReducer';
import invitationReducer from './invitationReducer';

const rootReducer = combineReducers({
    user: userReducer,
    households: householdReducer,
    server: serverReducer,
    invitations: invitationReducer
});

export default rootReducer;