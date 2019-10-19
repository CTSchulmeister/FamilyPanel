import {
    CREATE_HOUSEHOLD,
    PENDING_CREATE_HOUSEHOLD,
    CREATE_HOUSEHOLD_ERROR,
    AUTH_USER,
    CREATE_NOTE,
    PENDING_CREATE_NOTE,
    CREATE_NOTE_ERROR,
    READ_NOTE,
    READ_NOTE_ERROR
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
        };

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

export const createNote = (noteData) => async dispatch => {
    try {
        dispatch({
            type: PENDING_CREATE_NOTE
        });

        let householdId = store.getState().households.currentHousehold._id;

        let response = await fetch(`${ ROOT_URL }/api/household/${ householdId }/note`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth_jwt_token')
            },
            body: JSON.stringify(noteData)
        });

        response = await response.json();

        if(response.success === false) {
            throw new Error(response.errors.toString());
        }

        dispatch({
            type: CREATE_NOTE,
            household: response.household
        });
    } catch (error) {
        dispatch({
            type: CREATE_NOTE_ERROR,
            error: error
        });
    }
};

export const readNote = (noteId) => dispatch => {
    let currentHouseholdNotes = store.getState().households.currentHousehold.notes;
    let noteToRead = null;

    for(let i = 0; i < currentHouseholdNotes.length; i++) {
        if(noteId === currentHouseholdNotes[i]._id) {
            noteToRead = currentHouseholdNotes[i];
        }
    }

    if(noteToRead) {
        dispatch({
            type: READ_NOTE,
            currentNote: noteToRead
        });
    } else {
        dispatch({
            type: READ_NOTE_ERROR
        });
    }
};