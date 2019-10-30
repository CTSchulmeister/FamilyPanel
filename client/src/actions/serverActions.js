import {
    CLEAR_SERVER_ERRORS
} from './types';

export const clearServerErrors = () => dispatch => {
    dispatch({
        type: CLEAR_SERVER_ERRORS
    });
};