import {
    SERVER_CONNECTION_ERROR,
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
    EDIT_CURRENT_NOTE,
    CANCEL_EDIT_CURRENT_NOTE,
    
    PENDING_ACCEPT_INVITATION,
    INVITATION_ACCEPTED,
    ACCEPT_INVITATION_ERROR
} from '../actions/types';
import _ from 'lodash';

const initialState = {
    loading: false,
    households: [],
    currentHousehold: null,
    currentNote: null
};

const updateHouseholdInHouseholdsArray = (state, household) => {
    return state.households.map(storedHousehold => {
        if(storedHousehold._id === household._id) {
            return household
        } else {
            return storedHousehold;
        }
    });
};

const changeCurrentHousehold = household => {
    if(household !== null) {
        household.notes = _.sortBy(household.notes, 'createdAt').reverse();
    }
    
    return household;
};

export default function(state = initialState, action) {
    switch(action.type) {
        // Logging In / Out
        case USER_LOGGED_IN:
            return {
                ...state,
                households: action.households,
                currentHousehold: changeCurrentHousehold(action.currentHousehold)
            };
        case USER_LOGGED_OUT: 
            return initialState;

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
                currentHousehold: changeCurrentHousehold(action.currentHousehold),
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
                currentHousehold: changeCurrentHousehold(action.currentHousehold),
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
                households: updateHouseholdInHouseholdsArray(state, action.household),
                currentHousehold: changeCurrentHousehold(action.household),
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
            };
        case CANCEL_EDIT_CURRENT_NOTE:
            return {
                ...state,
                currentNote: {
                    ...state.currentNote,
                    isEditing: false
                }
            };

        // Invitations
        case PENDING_ACCEPT_INVITATION:
            return {
                ...state,
                loading: true
            };
        case INVITATION_ACCEPTED:
            return {
                ...state,
                loading: false,
                households: state.households.concat(action.household),
                currentHousehold: changeCurrentHousehold(action.household)
            };
        case ACCEPT_INVITATION_ERROR:
            return {
                ...state,
                loading: false
            };

        case SERVER_CONNECTION_ERROR: 
            return initialState;

        default:
            return state;
    }
}