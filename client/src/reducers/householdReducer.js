import {
    USER_LOGGED_IN,
    USER_LOGGED_OUT,
    PENDING_HOUSEHOLD_CREATION,
    HOUSEHOLD_CREATED,
    HOUSEHOLD_CREATION_ERROR,
    PENDING_CURRENT_HOUSEHOLD_CHANGE,
    CURRENT_HOUSEHOLD_CHANGED,
    CURRENT_HOUSEHOLD_CHANGE_ERROR,
    PENDING_HOUSEHOLD_UPDATE,
    HOUSEHOLD_UPDATED,
    HOUSEHOLD_UPDATE_ERROR,
    CHANGE_CURRENT_NOTE,
    EDIT_CURRENT_NOTE
} from '../actions/types';

const initialState = {
    loading: false,
    households: [],
    currentHousehold: null,
    currentNote: null
};

export default function(state = initialState, action) {
    switch(action.type) {
        // Logging In / Out
        case USER_LOGGED_IN:
            return {
                ...state,
                households: action.households,
                currentHousehold: action.currentHousehold
            };
        case USER_LOGGED_OUT: 
            return {
                ...state,
                households: null,
                currentHousehold: null
            };

        // Household Actions
        case PENDING_HOUSEHOLD_CREATION:
            return {
                ...state,
                loading: true
            };
        case HOUSEHOLD_CREATED:
            return {
                ...state,
                loading: false,
                households: state.households.concat(action.currentHousehold),
                currentHousehold: action.currentHousehold,
                currentNote: null
            };
        case HOUSEHOLD_CREATION_ERROR:
            return {
                ...state,
                loading: false,
                currentNote: null
            };
        case PENDING_CURRENT_HOUSEHOLD_CHANGE:
            return {
                ...state,
                loading: true
            };
        case CURRENT_HOUSEHOLD_CHANGED:
            return {
                ...state,
                loading: false,
                currentHousehold: action.currentHousehold,
                currentNote: null
            };
        case CURRENT_HOUSEHOLD_CHANGE_ERROR:
            return {
                ...state,
                loading: false
            };
        case PENDING_HOUSEHOLD_UPDATE:
            return {
                ...state,
                loading: true
            };
        case HOUSEHOLD_UPDATED:
            return {
                ...state,
                loading: false,
                currentHousehold: action.household,
                currentNote: (action.currentNote || action.currentNote === null)
                    ? action.currentNote
                    : state.currentNote
            };
        case HOUSEHOLD_UPDATE_ERROR:
            return {
                ...state,
                loading: false
            };
        
        // Note Actions
        case CHANGE_CURRENT_NOTE:
            return {
                ...state,
                currentNote: {
                    ...action.currentNote,
                    isEditing: false
                }
            };
        case EDIT_CURRENT_NOTE:
            return {
                ...state,
                currentNote: {
                    ...state.currentNote,
                    isEditing: true,
                }
            }

        default:
            return state;
    }
}