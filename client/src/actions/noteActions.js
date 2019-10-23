import {
    PENDING_HOUSEHOLD_UPDATE,
    HOUSEHOLD_UPDATED,
    HOUSEHOLD_UPDATE_ERROR,
    CHANGE_CURRENT_NOTE
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

        if(!createNoteResponse.success) throw createNoteResponse.errors();
        
        dispatch({
            type: HOUSEHOLD_UPDATED,
            household: createNoteResponse.household
        });
    } catch (errors) {
        dispatch({
            type: HOUSEHOLD_UPDATE_ERROR,
            errors: errors
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

        if(!deleteNoteResponse.success) throw deleteNoteResponse.errors;

        let currentNote = store.getState().households.currentNote;
        let newCurrentNote = currentNote;

        if(currentNote && currentNote._id === noteId) newCurrentNote = null;

        dispatch({
            type: HOUSEHOLD_UPDATED,
            household: deleteNoteResponse.household,
            currentNote: newCurrentNote
        });
    } catch (errors) {
        dispatch({
            type: HOUSEHOLD_UPDATE_ERROR,
            errors: errors
        });
    }
};