import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    PENDING_AUTH
} from './types';

const ROOT_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const registerUser = (userData) => async dispatch => {
    try {
        dispatch({ 
            type: PENDING_AUTH 
        });

        let response = await fetch(`${ROOT_URL}/api/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
    
        response = await response.json();

        if(response.success === false) {
            throw new Error(response.errors.toString());
        }

        localStorage.setItem('auth_jwt_token', response.token);
    
        dispatch({
            type: AUTH_USER,
            user: response.user,
            token: response.token
        });
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
            error: error
        });
    }
};

export const logUserIn = (userData) => async (dispatch) => {
    try {
        dispatch({ 
            type: PENDING_AUTH 
        });

        let response = await fetch(`${ROOT_URL}/api/user/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        response = await response.json();

        if(response.success === false) {
            throw new Error(response.errors.toString());
        }

        dispatch({
            type: AUTH_USER,
            user: response.user,
            token: response.token
        });
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
            error: error
        });
    }
}

export const logUserOut = () => dispatch => {
    dispatch({
        type: UNAUTH_USER
    });
};