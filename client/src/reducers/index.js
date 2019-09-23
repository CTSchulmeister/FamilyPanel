import { combineReducers } from 'redux';

import authReducer from './authReducer';
import viewReducer from './viewReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    view: viewReducer
});

export default rootReducer;