import {
    CREATE_NOTE,
    READ_NOTE,
    READ_NOTE_ERROR,
    PENDING_GET_HOUSEHOLDS
} from './types';

import store from '../store';

const ROOT_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const createNote = () => {

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