import {
    READ_NOTE,
    READ_NOTE_ERROR
} from '../actions/types';

const initailState = {
    currentNote: null
};

export default function(state = initailState, action) {
    switch(action.type) {
        case READ_NOTE:
            return {
                ...state,
                currentNote: action.currentNote
            };
        case READ_NOTE_ERROR:
            return {
                ...state,
                currentNote: null
            };
        default:
            return state;
    }
}