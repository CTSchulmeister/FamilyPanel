import React from 'react';
import { connect } from 'react-redux';
import {
    selectInvitations
} from '../../reducers/selectors';

import InvitationNotification from './InvitationNotification';

const NotificationsDropDown = props => {
    const invitations = props.invitations.map(invitation => {
        return (
            <InvitationNotification
                invitation={ invitation }
                key={ invitation._id }
            />
        );
    });

    return (
        <div>
            { invitations.length > 0
                ? invitations
                : `You have no notifications`
            }
        </div>
    );    
};

const mapStateToProps = state => {
    return {
        invitations: selectInvitations(state)
    };
};

export default connect(mapStateToProps)(NotificationsDropDown);