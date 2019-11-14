import {
    SERVER_CONNECTION_ERROR,
    USER_LOGGED_OUT,

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
} from '../actions/types';

const initialState = {
    loading: false,
    invitations: [],
    invitationCreationError: null,
    acceptInvitationError: null,
    getInvitationsError: null,
    deleteInvitationError: null
};

const removeInvitation = (state, invitationId) => {
    return state.invitations.filter(storedInvitation => storedInvitation._id !== invitationId);
};

export default function(state = initialState, action) {
    switch(action.type) {
        // Pending Actions
        case PENDING_CREATE_INVITATION:
        case PENDING_ACCEPT_INVITATION:
        case PENDING_DELETE_INVITATION:
        case PENDING_GET_INVITATIONS:
            return {
                ...state,
                loading: true
            };

        // Create Invitation
        case INVITATION_CREATED:
            return {
                ...state,
                loading: false
            };
        case INVITATION_CREATION_ERROR:
            return {
                ...state,
                loading: false,
                invitationCreationError: action.errors
            };

        // Get Invitations
        case INVITATIONS_RECIEVED:
            return {
                ...state,
                loading: false,
                invitations: action.invitations
            };
        case GET_INVITATIONS_ERROR:
            return {
                ...state,
                loading: false,
                invitations: [],
                getInvitationsError: action.errors
            };

        // Accept Invitation
        case INVITATION_ACCEPTED:
            return {
                ...state,
                loading: false,
                invitations: removeInvitation(state, action.invitationId)
            };
        case ACCEPT_INVITATION_ERROR:
            return {
                ...state,
                loading: false,
                acceptInvitationError: action.errors
            };

        // Delete Invitation
        case INVITATION_DELETED:
            return {
                ...state,
                loading: false,
                invitations: removeInvitation(state, action.invitationId)
            };
        case INVITATION_DELETION_ERROR:
            return {
                ...state,
                loading: false,
                deleteInvitationError: action.errors
            };

        case CLEAR_INVITATION_ERRORS:
            return {
                ...state,
                loading: false,
                invitationCreationError: null,
                acceptInvitationError: null,
                getInvitationsError: null,
                deleteInvitationError: null
            };

        case SERVER_CONNECTION_ERROR: 
        case USER_LOGGED_OUT:
            return initialState;

        default:
            return state;
    }
}