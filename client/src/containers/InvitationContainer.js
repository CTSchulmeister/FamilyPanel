import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    acceptInvitation,
    deleteInvitation
} from '../actions/invitationActions';
import {
    selectInvitations
} from '../selectors/invitationSelectors';
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
        deleteInvitation: props.deleteInvitation,
        invitation: invitation,
        history: history
    };

    return (
        <Invitation { ...passedProps } />
    );
}

const mapStateToProps = state => ({
    invitations: selectInvitations(state)
});

export default connect(mapStateToProps, {
    acceptInvitation,
    deleteInvitation
})(InvitationContainer)