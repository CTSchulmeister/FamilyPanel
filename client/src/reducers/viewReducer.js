import {
    CHANGE_VIEW, 
    CHANGE_SUB_VIEW,
    SHOW_HOUSEHOLD_CREATION_FORM,
    HIDE_HOUSEHOLD_CREATION_FORM
} from '../actions/types';

const initialState = {
    currentView: 'profile',
    showHouseholdCreationForm: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case CHANGE_VIEW:
            return {
                ...state,
                currentView: action.currentView,
                householdCreationFormIsActive: false
            };
        case CHANGE_SUB_VIEW:
            return {
                ...state,
                subView: action.subView
            };
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