import {
    CREATE_EVENT,
    PENDING_CREATE_EVENT,
    CREATE_EVENT_ERROR
} from '../actions/types';

const initialState = {

};

export default function(state = initialState, action) {
    switch(action.type) {
        case CREATE_EVENT:
            return {
                ...state
            };
        case PENDING_CREATE_EVENT:
            return {
                ...state
            };
        case CREATE_EVENT_ERROR:
            return {
                ...state
            };
        default:
            return state;
    }
}