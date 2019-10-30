import {
    SERVER_CONNECTION_ERROR,
    PENDING_HOUSEHOLD_CREATION,
    HOUSEHOLD_CREATED,
    HOUSEHOLD_CREATION_ERROR,
    PENDING_CURRENT_HOUSEHOLD_CHANGE,
    CURRENT_HOUSEHOLD_CHANGED,
    CURRENT_HOUSEHOLD_CHANGE_ERROR
} from './types';

import store from '../store';
import config from '../config';

const ROOT_URL = process.env.REACT_APP_API_URL || `http://localhost:${ config.PORT }`;

export const createHousehold = (householdData) => async dispatch => {
    try {
        let user = store.getState().user.user;

        let submissionData = {
            ownerId: user._id,
            memberIds: [user._id],
            name: householdData.name
        };

        dispatch({
            type: PENDING_HOUSEHOLD_CREATION
        });

        let createHouseholdResponse = await fetch(`${ ROOT_URL }/api/household`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth_jwt_token')
            },
            body: JSON.stringify(submissionData)
        });
        createHouseholdResponse = await createHouseholdResponse.json();

        if(createHouseholdResponse.success === false) {
            dispatch({
                type: HOUSEHOLD_CREATION_ERROR,
                errors: createHouseholdResponse.errors
            });
        }

        dispatch({
            type: HOUSEHOLD_CREATED,
            currentHousehold: createHouseholdResponse.currentHousehold,
            user: createHouseholdResponse.user
        });
    } catch (error) {
        dispatch({
            type: SERVER_CONNECTION_ERROR
        });
    }
};

export const changeCurrentHousehold = (householdId) => async dispatch => {
    try {
        dispatch({
            type: PENDING_CURRENT_HOUSEHOLD_CHANGE
        });

        let householdResponse = await fetch(`${ ROOT_URL }/api/user/me/change-current-household`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth_jwt_token')
            },
            body: JSON.stringify({ 
                currentHousehold: householdId
            })
        });
        householdResponse = await householdResponse.json();

        if(householdResponse.success === false) {
            dispatch({
                type: CURRENT_HOUSEHOLD_CHANGE_ERROR,
                errors: householdResponse.errors
            });
        }

        dispatch({
            type: CURRENT_HOUSEHOLD_CHANGED,
            currentHousehold: householdResponse.household
        });
    } catch (error) {
        dispatch({
            type: SERVER_CONNECTION_ERROR
        });
    }
};