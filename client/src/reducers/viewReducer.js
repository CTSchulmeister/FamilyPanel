import {
    CHANGE_VIEW
} from '../actions/types';

const initialState = {
    currentView: 'profile'
};

export default function(state = initialState, action) {
    switch(action.type) {
        case CHANGE_VIEW:
            return {
                ...state,
                currentView: action.currentView
            };
        default:
            return state;
    }
};