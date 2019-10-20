import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    PENDING_AUTH,
    REGISTRATION_ERROR,
    LOGIN_ERROR,
    PENDING_GET_HOUSEHOLDS,
    GET_HOUSEHOLDS
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
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        response = await response.json();

        if(response.success === false) {
            dispatch({
                type: REGISTRATION_ERROR,
                registrationErrors: response.errors
            });
        } else {
            localStorage.setItem('auth_jwt_token', response.token);
    
            dispatch({
                type: AUTH_USER,
                user: response.user,
                token: response.token
            });
        }        
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
            dispatch({
                type: LOGIN_ERROR,
                loginErrors: response.errors
            });
        } else {
            localStorage.setItem('auth_jwt_token', response.token);

            dispatch({
                type: AUTH_USER,
                user: response.user,
                token: response.token
            });

            if(response.user._householdIds.length > 0) {
                dispatch({
                    type: PENDING_GET_HOUSEHOLDS
                })
    
                const householdId = response.user._householdIds[0];
        
                response = await fetch(`${ROOT_URL}/api/household/${ householdId }`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('auth_jwt_token')
                    }
                });
    
                response = await response.json();
    
                if(response.success === false) {
                    throw new Error(response.errors.toString());
                }

                let household = {
                    ...response.household,
                    members: []
                };

                response = await fetch(`${ROOT_URL}/api/household/${ householdId }/users`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('auth_jwt_token')
                    }
                });

                response = await response.json();

                if(response.success === false) {
                    throw new Error(response.errors.toString());
                };

                household.members = [...response.users];
        
                dispatch({
                    type: GET_HOUSEHOLDS,
                    currentHousehold: household
                });
            }
        }
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
            error: error
        });
    }
}

export const logUserOut = () => async dispatch => {
    try {
        let response = await fetch(`${ROOT_URL}/api/user/me/logout-all`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth_jwt_token')
            }
        });

        response = await response.json();
    
        if(response.success === true) {
            dispatch({
                type: UNAUTH_USER
            });
        } else {
            alert('Logout unsuccessful: ' + JSON.stringify(response));
        }    
    } catch (error) {
        alert(error);
    }
};