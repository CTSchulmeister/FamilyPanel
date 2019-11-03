import {
    SERVER_CONNECTION_ERROR,

    PENDING_CREATE_INVITATION,
    INVITATION_CREATED,
    INVITATION_CREATION_ERROR,

    PENDING_ACCEPT_INVITATION,
    INVITATION_ACCEPTED,
    ACCEPT_INVITATION_ERROR,

    PENDING_DELETE_INVITATION,
    INVITATION_DELETED,
    INVITATION_DELETION_ERROR,

    PENDING_GET_INVITATIONS,
    INVITATIONS_RECIEVED,
    GET_INVITATIONS_ERROR,
} from './types';

const ROOT_URL = process.env.REACT_APP_API_URL || `http://localhost:${ config.PORT }`;

export const createInvitation = invitationData => async dispatch => {
    try {
        dispatch({
            type: PENDING_CREATE_INVITATION
        });

        let createInvitationResponse = await fetch(`${ ROOT_URL }/api/invitation`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth_jwt_token')
            },
            body: JSON.stringify(invitationData)
        });
        createInvitationResponse = await createInvitationResponse.json();

        if(createInvitationResponse.success === false) {
            dispatch({
                type: INVITATION_CREATION_ERROR,
                errors: createInvitationResponse.errors
            });
            return;
        }

        dispatch({
            type: INVITATION_CREATED,
            invitation: createInvitationResponse.invitation
        });
    } catch (e) {
        dispatch({
            type: SERVER_CONNECTION_ERROR
        });
    }
};

export const deleteInvitation = invitationId => async dispatch => {
    try {
        dispatch({
            type: PENDING_DELETE_INVITATION
        });

        let deleteInvitationResponse = await fetch(`${ ROOT_URL }/api/invitation/${ invitationId }`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth_jwt_token')
            }
        });
        deleteInvitationResponse = await deleteInvitationResponse.json();

        if(deleteInvitationResponse.success === false) {
            dispatch({
                type: INVITATION_DELETION_ERROR,
                errors: deleteInvitationResponse.errors
            });
            return;
        }

        dispatch({
            type: INVITATION_DELETED,
            invitation: deleteInvitationResponse.invitation
        });
    } catch (e) {
        dispatch({
            type: SERVER_CONNECTION_ERROR
        });
    }
};

export const getInvitations = () => async dispatch => {

};

export const acceptInvitation = () => async dispatch => {

};