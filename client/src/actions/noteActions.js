import {
    SERVER_CONNECTION_ERROR,
    PENDING_HOUSEHOLD_UPDATE,
    HOUSEHOLD_UPDATED,
    HOUSEHOLD_UPDATE_ERROR,
    CHANGE_CURRENT_NOTE,
    EDIT_CURRENT_NOTE,
    CANCEL_EDIT_CURRENT_NOTE
} from './types';

import store from '../store';
import config from '../config';

const ROOT_URL = process.env.REACT_APP_API_URL || `http://localhost:${ config.PORT }`;

export const createNote = noteData => async dispatch => {
    try {
        dispatch({
            type: PENDING_HOUSEHOLD_UPDATE
        });

        let householdId = store.getState().households.currentHousehold._id;

        let createNoteResponse = await fetch(`${ ROOT_URL }/api/household/${ householdId }/note`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth_jwt_token')
            },
            body: JSON.stringify(noteData)
        })
        createNoteResponse = await createNoteResponse.json();

        if(createNoteResponse.success === false) {
            dispatch({
                type: HOUSEHOLD_UPDATE_ERROR,
                errors: createNoteResponse.errors
            });
            return;
        }
        
        dispatch({
            type: HOUSEHOLD_UPDATED,
            household: createNoteResponse.household
        });
    } catch (error) {
        dispatch({
            type: SERVER_CONNECTION_ERROR
        });
    }
};

export const readNote = noteId => dispatch => {
    let currentHouseholdNotes = store.getState().households.currentHousehold.notes;
    let noteToRead = null;

    for(let note of currentHouseholdNotes) {
        if(note._id === noteId) {
            noteToRead = note;
            break;
        }
    }

    if(noteToRead) {
        dispatch({
            type: CHANGE_CURRENT_NOTE,
            currentNote: noteToRead
        });
    }
};

export const editNote = () => dispatch => {
    dispatch({
        type: EDIT_CURRENT_NOTE
    });
};

export const cancelEditNote = () => dispatch => {
    dispatch({
        type: CANCEL_EDIT_CURRENT_NOTE
    });
};

export const updateNote = noteData => async dispatch => {
    try {
        dispatch({
            type: PENDING_HOUSEHOLD_UPDATE
        });
        
        let updateNoteResponse = await fetch(`${ ROOT_URL }/api/household/${ noteData.householdId }/note/${ noteData.noteId }`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth_jwt_token')
            },
            body: JSON.stringify(noteData)
        });
        updateNoteResponse = await updateNoteResponse.json();

        if(updateNoteResponse.success === false) {
            dispatch({
                type: HOUSEHOLD_UPDATE_ERROR,
                errors: updateNoteResponse.errors
            });
            return;
        }

        let currentNote = null;

        for(let note of updateNoteResponse.household.notes) {
            if(note._id === noteData.noteId) {
                currentNote = note;
            }
        }

        if(currentNote === null) {
            throw new Error('The note could not be found in the updated household');
        }

        dispatch({
            type: HOUSEHOLD_UPDATED,
            household: updateNoteResponse.household,
            currentNote: currentNote
        });
    } catch (error) {
        dispatch({
            type: SERVER_CONNECTION_ERROR
        });
    }
};

export const deleteNote = noteId => async dispatch => {
    try {
        dispatch({
            type: PENDING_HOUSEHOLD_UPDATE
        });

        let householdId = store.getState().households.currentHousehold._id;

        let deleteNoteResponse = await fetch(`${ ROOT_URL }/api/household/${ householdId }/note/${ noteId }`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth_jwt_token')
            }
        });
        deleteNoteResponse = await deleteNoteResponse.json();

        if(deleteNoteResponse.success === false) {
            dispatch({
                type: HOUSEHOLD_UPDATE_ERROR,
                errors: deleteNoteResponse.errors
            });
            return;
        }

        let currentNote = store.getState().households.currentNote;
        let newCurrentNote = currentNote;

        if(currentNote && currentNote._id === noteId) newCurrentNote = null;

        dispatch({
            type: HOUSEHOLD_UPDATED,
            household: deleteNoteResponse.household,
            currentNote: newCurrentNote
        });
    } catch (error) {
        dispatch({
            type: SERVER_CONNECTION_ERROR
        });
    }
};