import {
    SHOW_HOUSEHOLD_CREATION_FORM,
    HIDE_HOUSEHOLD_CREATION_FORM
} from '../actions/types';

const initialState = {
    viewData: {
        currentView: 'profile',
        previousEvent: null,
        currentEvent: null,
        previousNote: null,
        currentNote: null,
        previousTask: null,
        currentTask: null
    },
    showHouseholdCreationForm: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case SHOW_HOUSEHOLD_CREATION_FORM:
            return {
                ...state,
                householdCreationFormIsActive: true
            };
        case HIDE_HOUSEHOLD_CREATION_FORM:
            return {
                ...state,
                householdCreationFormIsActive: false
            };
        default:
            return state;
    }
};