import {
    SERVER_CONNECTION_ERROR,
    CLEAR_SERVER_ERRORS
} from '../actions/types';

const initialState = {
    connectionError: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case SERVER_CONNECTION_ERROR:
            return {
                ...state,
                connectionError: true
            };
        case CLEAR_SERVER_ERRORS:
            return {
                ...state,
                connectionError: false
            };

        default:
            return {
                ...state,
                connectionError: false
            };
    }
}