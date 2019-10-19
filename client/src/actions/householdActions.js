import {
    CREATE_HOUSEHOLD,
    PENDING_CREATE_HOUSEHOLD,
    CREATE_HOUSEHOLD_ERROR,
    AUTH_USER,
    PENDING_CREATE_NOTE,
    PENDING_UPDATE_NOTE,
    PENDING_DELETE_NOTE,
    CREATE_NOTE,
    CREATE_NOTE_ERROR,
    READ_NOTE,
    READ_NOTE_ERROR,
    UPDATE_NOTE,
    UPDATE_NOTE_ERROR,
    DELETE_NOTE,
    DELETE_NOTE_ERROR
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

        let household = {
            ...response.household,
            members: [
                user
            ]
        }

        dispatch({
            type: CREATE_HOUSEHOLD,
            household: household
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

// Notes

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

        let household = {
            ...store.getState().households.currentHousehold,
            ...response.household
        }

        dispatch({
            type: CREATE_NOTE,
            household: household
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

export const updateNote = (noteId, noteData) => async dispatch => {

};

export const deleteNote = (noteId) => async dispatch => {
    try {
        dispatch({
            type: PENDING_DELETE_NOTE
        });

        let householdId = store.getState().households.currentHousehold._id;

        let response = await fetch(`${ ROOT_URL }/api/household/${ householdId }/note/${ noteId }`, {
            method: 'DELETE',
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

        let currentNote = store.getState().households.currentNote;
        let newCurrentNote = currentNote;

        if(currentNote && currentNote._id === noteId) {
            newCurrentNote = null;
        }

        let household = {
            ...store.getState().households.currentHousehold,
            ...response.household
        };

        dispatch({
            type: DELETE_NOTE,
            household: household,
            currentNote: newCurrentNote
        });
    } catch (error) {
        dispatch({
            type: DELETE_NOTE_ERROR,
            error: error
        });
    }
};