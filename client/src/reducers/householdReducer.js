import {
    CREATE_HOUSEHOLD,
    PENDING_CREATE_HOUSEHOLD,
    CREATE_HOUSEHOLD_ERROR,
    PENDING_GET_HOUSEHOLDS,
    GET_HOUSEHOLDS,
    UNAUTH_USER,
    PENDING_CREATE_NOTE,
    CREATE_NOTE,
    CREATE_NOTE_ERROR,
    READ_NOTE,
    READ_NOTE_ERROR
} from '../actions/types';

const initialState = {
    loading: false,
    households: [],
    currentHousehold: '',
    currentNote: null,
    noteLoading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case PENDING_CREATE_HOUSEHOLD:
            return {
                ...state,
                loading: true
            };
        case CREATE_HOUSEHOLD:
            return {
                ...state,
                loading: false,
                households: state.households.push(action.household),
                currentHousehold: action.household
            };
        case CREATE_HOUSEHOLD_ERROR:
            return {
                ...state,
                loading: false
            };
        case PENDING_GET_HOUSEHOLDS:
            return {
                ...state,
                loading: true
            };
        case GET_HOUSEHOLDS: 
            return {
                ...state,
                loading: false,
                currentHousehold: action.currentHousehold
            };
        case UNAUTH_USER:
            return {
                ...state,
                loading: false,
                households: [],
                currentHousehold: ''
            };

        // NOTES
        case PENDING_CREATE_NOTE:
            return {
                ...state,
                noteLoading: true
            };
        case CREATE_NOTE:
            return {
                ...state,
                currentHousehold: action.household
            };
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