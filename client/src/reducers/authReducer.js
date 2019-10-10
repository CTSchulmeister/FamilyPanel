import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    PENDING_AUTH,
    REGISTRATION_ERROR,
    LOGIN_ERROR
} from '../actions/types';

const initialState = {
    loading: false,
    user: {},
    token: '',
    authenticated: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case PENDING_AUTH:
            return {
                ...state,
                loading: true,
                user: {},
                token: '',
                authenticated: false
            }
        case AUTH_USER:
            return {
                ...state,
                loading: false,
                user: action.user,
                token: action.token,
                authenticated: true,
                registrationErrors: null,
                loginErrors: null
            };
        case UNAUTH_USER:
            return {
                ...state,
                loading: false,
                user: null,
                token: null,
                authenticated: false
            };
        case AUTH_ERROR:
            return {
                ...state,
                loading: false,
                user: {},
                token: '',
                authenticated: false,
            };
        case REGISTRATION_ERROR:
            return {
                ...state,
                loading: false,
                registrationErrors: action.registrationErrors
            }
        case LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                loginErrors: action.loginErrors
            }
        default:
            return state;
    }
};