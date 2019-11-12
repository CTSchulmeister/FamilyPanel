export const selectInvitationLoadingState = state => {
    return state.invitations.loading;
};

export const selectInvitations = state => {
    return state.invitations.invitations;
};

export const selectInvitationCreationError = state => {
    return state.invitations.invitationCreationError;
};

export const selectAcceptInvitationError = state => {
    return state.invitations.acceptInvitationError;
};

export const selectGetInvitationsError = state => {
    return state.invitations.getInvitationsError;
};

export const selectDeleteInvitationError = state => {
    return state.invitations.deleteInvitationError;
};