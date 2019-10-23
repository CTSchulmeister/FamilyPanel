import {
    PENDING_AUTHORIZATION,
    USER_REGISTERED,
    REGISTRATION_ERROR,
    USER_LOGGED_IN,
    LOGIN_ERROR,
    PENDING_LOG_OUT,
    USER_LOGGED_OUT,
    LOG_OUT_ERROR
} from './types';

import config from '../config';

const ROOT_URL = process.env.REACT_APP_API_URL || `http://localhost:${ config.PORT }`;

export const registerUser = userData => async dispatch => {
    try {
        dispatch({
            type: PENDING_AUTHORIZATION
        });

        let registrationResponse = await fetch(`${ ROOT_URL }/api/user`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(userData)
        });
        registrationResponse = await registrationResponse.json();

        if(!registrationResponse.success) throw registrationResponse.errors;

        localStorage.setItem('auth_jwt_token', registrationResponse.token);

        dispatch({
            type: USER_REGISTERED,
            user: registrationResponse.user,
            token: registrationResponse.token
        });
    } catch (errors) {
        dispatch({
            type: REGISTRATION_ERROR,
            errors: errors
        });
    }
};

export const logUserIn = userData => async dispatch => {
    try {
        dispatch({
            type: PENDING_AUTHORIZATION
        });

        let userResponse = await fetch(`${ ROOT_URL }/api/user/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(userData)
        });
        userResponse = await userResponse.json();

        if(!userResponse.success) throw userResponse.errors;

        localStorage.setItem('auth_jwt_token', userResponse.token);

        dispatch({
            type: USER_LOGGED_IN,
            user: userResponse.user,
            token: userResponse.token,
            households: userResponse.households,
            currentHousehold: userResponse.currentHousehold
        });
    } catch (errors) {
        dispatch({
            type: LOGIN_ERROR,
            errors: errors
        });
    }
};

export const logUserOut = () => async dispatch => {
    try {
        dispatch({
            type: PENDING_LOG_OUT
        });

        let logOutResponse = await fetch(`${ ROOT_URL }/api/user/me/logout-all`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth_jwt_token')
            }
        });
        logOutResponse = await logOutResponse.json();

        if(!logOutResponse.success) throw logOutResponse.errors;

        dispatch({
            type: USER_LOGGED_OUT
        });
    } catch (errors) {
        dispatch({
            type: LOG_OUT_ERROR,
            errors: errors
        });
    }
}