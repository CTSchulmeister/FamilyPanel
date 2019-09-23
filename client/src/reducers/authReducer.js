import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    PENDING_AUTH
} from '../actions/types';

const initialState = {
    loading: false,
    user: {},
    token: '',
    authenticated: false
}

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
                authenticated: true
            };
        case UNAUTH_USER:
            return {
                ...state,
                loading: false,
                user: {},
                token: '',
                authenticated: false
            }
        case AUTH_ERROR:
            return {
                ...state,
                loading: false,
                user: {},
                token: '',
                authenticated: false,
                error: action.error,
            };
        default:
            return state;
    }
};