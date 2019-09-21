import axios from 'axios';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR
} from './types';

const ROOT_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

axios.defaults.baseURL = ROOT_URL;

if(localStorage.getItem('auth_jwt_token')) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_jwt_token');
}
axios.defaults.headers.post['Content-Type'] = 'application/json';

const formatErrors = (errors) => {
    let formattedErrors = '';

    errors.forEach(error => {
        errors += error + '\n';
    });

    return formattedErrors;
}

export const logUserIn = (data) => {
    return async (dispatch) => {
        const response = await axios.post('/api/user/login', data);

        if(response.data.success) {
            dispatch({
                type: AUTH_USER
            });
            localStorage.setItem('auth_jwt_token', response.data.token);
            localStorage.setItem('user', response.data.user);
            window.location = '/';
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_jwt_token');
        } else {
            let errors = formatErrors(response.data.errors);

            console.error(`Error(s) encountered logging in user: ${ errors }`);
            
            dispatch({
                type: AUTH_ERROR,
                payload: `Error(s) encountered logging in user: ${ errors }`
            });
        }
    }
}

export const registerUser = (data) => {
    return async (dispatch) => {
        let response = await axios.post('/api/user', data);

        if(response.data.success) {
            dispatch({
                type: AUTH_USER
            });
            localStorage.setItem('auth_jwt_token', response.data.token);
            localStorage.setItem('user', response.data.user);
            window.location = '/';
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_jwt_token');
        } else {
            let errors = formatErrors(response.data.errors);

            console.error(`Error(s) encountered registering user: ${ errors }`);

            dispatch({
                type: AUTH_ERROR,
                payload: `Error(s) encountered registering user: ${ errors }`
            });
        }
    }
}

export function logUserOut(data) {
    return function (dispatch) {
        dispatch({
            type: UNAUTH_USER,
            user: null
        });
        localStorage.removeItem('auth_jwt_token');
    }
}

const request = axios;
export { request };