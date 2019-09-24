import {
    CREATE_HOUSEHOLD,
    PENDING_CREATE_HOUSEHOLD,
    CREATE_HOUSEHOLD_ERROR,
    PENDING_GET_HOUSEHOLDS,
    GET_HOUSEHOLDS
} from '../actions/types';

const initialState = {
    loading: false,
    households: [],
    currentHousehold: ''
}

export default function(state = initialState, action) {
    switch(action.type) {
        case PENDING_CREATE_HOUSEHOLD:
            return {
                ...state,
                loading: true
            };
        case CREATE_HOUSEHOLD:
            return {
                ...state,
                loading: false,
                households: state.households.push(action.household),
                currentHousehold: action.household
            };
        case CREATE_HOUSEHOLD_ERROR:
            return {
                ...state,
                loading: false
            };
        case PENDING_GET_HOUSEHOLDS:
            return {
                ...state,
                loading: true
            };
        case GET_HOUSEHOLDS: 
            return {
                ...state,
                loading: false,
                currentHousehold: action.currentHousehold
            };
        default:
            return state;
    }
}