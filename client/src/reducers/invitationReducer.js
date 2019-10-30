import {
    SERVER_CONNECTION_ERROR,
    PENDING_GET_INVITATIONS,
    INVITATIONS_RECIEVED,
    ERROR_GETTING_INVITATIONS
} from '../actions/types';

const initialState = {
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case PENDING_GET_INVITATIONS:
            return {
                ...state,
                loading: true
            };
        case INVITATIONS_RECIEVED:
            return {
                ...state,
                loading: false,
                invitations: action.invitations
            };
        case ERROR_GETTING_INVITATIONS:
            return {
                ...state,
                loading: false,
                errors: action.errors
            };

        case SERVER_CONNECTION_ERROR: 
            return initialState;

        default:
            return state;
    }
}