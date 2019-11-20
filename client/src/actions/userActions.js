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
    INVITATIONS_RECIEVED
} from './types';
import {
    hashPassword
} from '../util';

import config from '../config';

const ROOT_URL = process.env.REACT_APP_API_URL || `http://localhost:${ config.PORT }`;

export const registerUser = userData => async dispatch => {
    try {
        dispatch({
            type: PENDING_AUTHORIZATION
        });

        let errors = [];

        if(userData.email !== userData.retypeEmail) {
            errors.push(new Error('The values for email and retype email do not match.'));
        }

        if(userData.password !== userData.retypePassword) {
            errors.push(new Error('The values for password and retype password do not match.'));
        }

        if(errors.length > 0) {
            dispatch({
                type: REGISTRATION_ERROR,
                errors: errors
            });
            return;
        }

        userData = {
            ...userData,
            password: hashPassword(userData.password),
            retypePassword: undefined
        };

        let registrationResponse = await fetch(`${ ROOT_URL }/api/user`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(userData)
        });
        registrationResponse = await registrationResponse.json();

        if(registrationResponse.success === false) {
            dispatch({
                type: REGISTRATION_ERROR,
                errors: registrationResponse.errors
            });
            return;
        }

        localStorage.setItem('auth_jwt_token', registrationResponse.token);

        dispatch({
            type: USER_REGISTERED,
            user: registrationResponse.user,
            token: registrationResponse.token
        });

        dispatch({
            type: INVITATIONS_RECIEVED,
            invitations: registrationResponse.invitations
        });
    } catch (error) {
        dispatch({
            type: SERVER_CONNECTION_ERROR
        });
    }
};

export const logUserIn = userData => async dispatch => {
    try {
        dispatch({
            type: PENDING_AUTHORIZATION
        });

        const submissionData = {
            ...userData,
            password: hashPassword(userData.password)
        };

        let userResponse = await fetch(`${ ROOT_URL }/api/user/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(submissionData)
        });

        userResponse = await userResponse.json();

        if(userResponse.success === false) {
            dispatch({
                type: LOGIN_ERROR,
                errors: userResponse.errors
            })
            return;
        }

        localStorage.setItem('auth_jwt_token', userResponse.token);

        dispatch({
            type: USER_LOGGED_IN,
            user: userResponse.user,
            token: userResponse.token,
            households: userResponse.households,
            currentHousehold: userResponse.currentHousehold
        });

        dispatch({
            type: INVITATIONS_RECIEVED,
            invitations: userResponse.invitations
        });
    } catch (error) {
        dispatch({
            type: SERVER_CONNECTION_ERROR
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

        if(logOutResponse.success === false) {
            dispatch({
                type: LOG_OUT_ERROR,
                errors: logOutResponse.errors
            });
            return;
        }

        dispatch({
            type: USER_LOGGED_OUT
        });
    } catch (error) {
        dispatch({
            type: SERVER_CONNECTION_ERROR
        });
    }
}