import React from 'react';
import PropTypes from 'prop-types';

import InvitationNotification from './InvitationNotification';

const Notifications = ({
    invitations
}) => {
    if(invitations.length === 0) {
        return (
            <div className="notifications--none">
                You have no notifications
            </div>
        );
    }

    const invitationNotifications = invitations.map(invitation => {
        return (
            <InvitationNotification
                invitation={ invitation }
                key={ invitation._id }
            />
        );
    });

    return (
        <div className="notifications">
            { invitationNotifications }
        </div>
    );
};

Notifications.propTypes = {
    invitations: PropTypes.array.isRequired
};

export default Notifications;