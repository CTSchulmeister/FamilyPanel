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

    CLEAR_INVITATION_ERRORS
} from './types';

import {
    selectUser
} from '../selectors/userSelectors';

import store from '../store';
import config from '../config';

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
        } else {
            dispatch({
                type: INVITATION_CREATED,
                invitation: createInvitationResponse.invitation
            });
        }
    } catch (e) {
        dispatch({
            type: SERVER_CONNECTION_ERROR
        });
    }
};

export const deleteInvitationByReciever = invitationId => async dispatch => {
    try {
        dispatch({
            type: PENDING_DELETE_INVITATION
        });

        let deleteInvitationResponse = await fetch(`${ ROOT_URL }/api/invitation/reciever/${ invitationId }`, {
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
            invitationId: invitationId
        });
    } catch (e) {
        dispatch({
            type: SERVER_CONNECTION_ERROR
        });
    }
};

export const deleteInvitationBySender = invitationId => async dispatch => {
    try {
        dispatch({
            type: PENDING_DELETE_INVITATION
        });

        let deleteInvitationResponse = await fetch(`${ ROOT_URL }/api/invitation/sender/${ invitationId }`, {
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
            invitationId: invitationId
        });
    } catch (e) {
        dispatch({
            type: SERVER_CONNECTION_ERROR
        });
    }
};

export const getInvitationsByEmail = () => async dispatch => {
    try {
        dispatch({
            type: PENDING_GET_INVITATIONS
        });

        const user = selectUser(store.getState());

        let invitationsResponse = await fetch(`${ ROOT_URL }/api/invitation/email/${ user.email }`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth_jwt_token')
            }
        });
        invitationsResponse = await invitationsResponse.json();

        if(invitationsResponse.success === false) {
            dispatch({
                type: GET_INVITATIONS_ERROR,
                errors: invitationsResponse.errors
            });
            return;
        }

        dispatch({
            type: INVITATIONS_RECIEVED,
            invitations: invitationsResponse.invitations
        });
    } catch (e) {
        dispatch({
            type: SERVER_CONNECTION_ERROR
        });
    }
};

export const acceptInvitation = invitationId => async dispatch => {
    try {
        dispatch({
            type: PENDING_ACCEPT_INVITATION
        });

        let acceptInvitationResponse = await fetch(`${ ROOT_URL }/api/invitation/${ invitationId }/accept`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth_jwt_token')
            }
        });
        acceptInvitationResponse = await acceptInvitationResponse.json();

        if(acceptInvitationResponse.success === false) {
            dispatch({
                type: ACCEPT_INVITATION_ERROR
            });
            return;
        }

        dispatch({
            type: INVITATION_ACCEPTED,
            user: acceptInvitationResponse.user,
            invitationId: invitationId,
            household: acceptInvitationResponse.household
        });
    } catch (e) {
        dispatch({
            type: SERVER_CONNECTION_ERROR
        });
    }
};

export const clearInvitationErrors = () => async dispatch => {
    dispatch({
        type: CLEAR_INVITATION_ERRORS
    });
};