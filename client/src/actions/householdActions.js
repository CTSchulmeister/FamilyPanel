import {
    CREATE_HOUSEHOLD,
    PENDING_CREATE_HOUSEHOLD,
    CREATE_HOUSEHOLD_ERROR,
    AUTH_USER,
} from './types';
import store from '../store';

const ROOT_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const createHousehold = (householdData) => async dispatch => {
    try {
        let user = store.getState().auth.user;

        let submissionData = {
            ownerId: user._id,
            memberIds: [user._id],
            name: householdData.name
        }

        dispatch({
            type: PENDING_CREATE_HOUSEHOLD
        });

        let response = await fetch(`${ROOT_URL}/api/household`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth_jwt_token')
            },
            body: JSON.stringify(submissionData)
        });

        response = await response.json();

        if(response.success === false) {
            throw new Error(response.errors.toString());
        }

        dispatch({
            type: CREATE_HOUSEHOLD,
            household: response.household
        });

        response = await fetch(`${ROOT_URL}/api/user/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth_jwt_token')
            }
        });

        response = await response.json();

        dispatch({
            type: AUTH_USER,
            user: response.user,
            token: localStorage.getItem('auth_jwt_token')
        });

        if(response.success === false) {
            throw new Error(response.errors.toString());
        }
    } catch (error) {
        dispatch({
            type: CREATE_HOUSEHOLD_ERROR,
            error: error
        });
    }
}