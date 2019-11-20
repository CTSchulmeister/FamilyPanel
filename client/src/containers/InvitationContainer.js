import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    acceptInvitation,
    deleteInvitationByReciever
} from '../actions/invitationActions';
import {
    selectInvitations
} from '../selectors/invitationSelectors';
import {
    selectAuthenticationState
} from '../selectors/userSelectors';
import history from '../history';

import Invitation from '../components/Invitation';

const InvitationContainer = props => {
    const {
        id
    } = useParams();

    const filteredInvitations = props.invitations.filter(invitation => invitation._id === id);

    let invitation = null;
    if(filteredInvitations.length > 0) invitation = filteredInvitations[0];

    const passedProps = {
        acceptInvitation: props.acceptInvitation,
        deleteInvitation: props.deleteInvitationByReciever,
        invitation: invitation,
        isAuthenticated: props.isAuthenticated,
        history: history
    };

    return (
        <Invitation { ...passedProps } />
    );
}

const mapStateToProps = state => ({
    isAuthenticated: selectAuthenticationState(state),
    invitations: selectInvitations(state)
});

export default connect(mapStateToProps, {
    acceptInvitation,
    deleteInvitationByReciever
})(InvitationContainer)