import {
    CREATE_EVENT,
    PENDING_CREATE_EVENT,
    CREATE_EVENT_ERROR
} from './types';
import store from '../store';

const ROOT_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const createEvent = (eventData) => async dispatch => {
    try {
        let user = store.getState().auth.user;
        let currentHousehold = store.getState().households.currentHousehold;

        let submissionData = {
            creatorId: user._id,
            title: eventData.title,
            description: eventData.description,
            time: eventData.time,
            location: [eventData.xCoord, eventData.yCoord]
        };

        dispatch({
            type: PENDING_CREATE_EVENT
        });

        let response = await fetch(`${ROOT_URL}/api/household/${ currentHousehold._id }/event`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth_jwt_token')
            },
            body: JSON.stringify(submissionData)
        });

        response = await response.json();

        if(response.success === false) {
            throw new Error(response.errors.toString());
        }

        dispatch({
            type: CREATE_EVENT,
            event: response.event,
        });
    } catch (error) {
        dispatch({
            type: CREATE_EVENT_ERROR,
            error: error
        });
    }
}