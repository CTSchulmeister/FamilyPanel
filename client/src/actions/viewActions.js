import {
    CHANGE_VIEW,
    CHANGE_SUB_VIEW,
    SHOW_HOUSEHOLD_CREATION_FORM,
    HIDE_HOUSEHOLD_CREATION_FORM
} from './types';

export const changeView = (view) => dispatch => {
    dispatch({
        type: CHANGE_VIEW,
        currentView: view
    });
};

export const changeSubView = (view) => dispatch => {
    dispatch({
        type: CHANGE_SUB_VIEW,
        subView: view
    });
}

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