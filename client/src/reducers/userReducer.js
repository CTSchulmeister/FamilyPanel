import {
    SERVER_CONNECTION_ERROR,
    PENDING_AUTHORIZATION,
    USER_REGISTERED,
    REGISTRATION_ERROR,
    USER_LOGGED_IN,
    LOGIN_ERROR,
    PENDING_LOG_OUT,
    USER_LOGGED_OUT,
    LOG_OUT_ERROR,
    HOUSEHOLD_CREATED,

    PENDING_ACCEPT_INVITATION,
    INVITATION_ACCEPTED,
    ACCEPT_INVITATION_ERROR
} from '../actions/types';

const initialState = {
    loading: false,
    user: null,
    token: null,
    authenticated: false,
    registrationErrors: null,
    logInErrors: null,
    loggingOutErrors: null
};

export default function(state = initialState, action) {
    switch(action.type) {
        // Registration / Log In
        case PENDING_AUTHORIZATION: 
            return {
                ...state,
                loading: true
            };
        case USER_REGISTERED:
            return {
                ...state,
                loading: false,
                user: action.user,
                token: action.token,
                authenticated: true,
                logInErrors: null,
                registrationErrors: null
            };
        case REGISTRATION_ERROR:
            return {
                ...state,
                loading: false,
                user: null,
                token: null,
                authenticated: null,
                registrationErrors: action.errors
            };
        case USER_LOGGED_IN:
            return {
                ...state,
                loading: false,
                user: action.user,
                token: action.token,
                authenticated: true,
                logInErrors: null,
                registrationErrors: null
            };
        case LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                user: null,
                token: null,
                authenticated: null,
                logInErrors: action.errors
            };

        // Logging Out
        case PENDING_LOG_OUT:
            return {
                ...state,
                loading: true
            };
        case USER_LOGGED_OUT:
            return {
                ...state,
                loading: false,
                user: null,
                token: null,
                authenticated: false,
            }
        case LOG_OUT_ERROR:
            return {
                ...state,
                loading: false,
                loggingOutErrors: action.errors
            };

        // Household-Caused User Updates
        case HOUSEHOLD_CREATED:
            return {
                ...state,
                user: action.user
            };

        // Invitation
        case PENDING_ACCEPT_INVITATION:
            return {
                ...state,
                loading: true
            };
        case INVITATION_ACCEPTED:
            return {
                ...state,
                loading: false,
                user: action.user
            };
        case ACCEPT_INVITATION_ERROR:
            return {
                ...state,
                loading: false
            };

        case SERVER_CONNECTION_ERROR: 
            return initialState;

        default:
            return state;
    }
};