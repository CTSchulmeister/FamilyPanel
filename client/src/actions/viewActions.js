import {
    SHOW_HOUSEHOLD_CREATION_FORM,
    HIDE_HOUSEHOLD_CREATION_FORM
} from './types';

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