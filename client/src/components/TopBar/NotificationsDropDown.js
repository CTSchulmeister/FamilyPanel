import React from 'react';
import { connect } from 'react-redux';
import {
    selectInvitations
} from '../../reducers/selectors';

import InvitationNotification from './InvitationNotification';

const NotificationsDropDown = props => {
    if(props.invitations.length === 0) {
        return (
            <div className="notifications--none">
                You have no notifications
            </div>
        );
    } else {
        const invitations = props.invitations.map(invitation => {
            return (
                <InvitationNotification
                    invitation={ invitation }
                    key={ invitation._id }
                />
            );
        });

        return (
            <div className="notifications">
                { invitations }
            </div>
        );
    }    
};

const mapStateToProps = state => {
    return {
        invitations: selectInvitations(state)
    };
};

export default connect(mapStateToProps)(NotificationsDropDown);