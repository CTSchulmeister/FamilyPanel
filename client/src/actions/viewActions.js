import {
    CHANGE_VIEW,
    SHOW_HOUSEHOLD_CREATION_FORM,
    HIDE_HOUSEHOLD_CREATION_FORM
} from './types';

export const changeView = (view) => dispatch => {
    dispatch({
        type: CHANGE_VIEW,
        currentView: view
    });
};

export const showHouseholdCreationForm = () => dispatch => {
    dispatch({
        type: SHOW_HOUSEHOLD_CREATION_FORM
    });
}

export const hideHouseholdCreationForm = () => dispatch => {
    dispatch({
        type: HIDE_HOUSEHOLD_CREATION_FORM
    })
};