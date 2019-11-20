import React from 'react';
import PropTypes from 'prop-types';
import history from '../history';

import CircleButton from './CircleButton';

const InvitationNotification = ({
    invitation
}) => {
    return (
        <div className="invitation-notification">
            <div className="invitation-notification__text">
                <span className="invitation-notification__subheading">
                    Invitation to join
                </span>
                <span className="invitation-notification__heading">
                    { invitation.householdName }
                </span>
            </div>
                <CircleButton
                    light={ false }
                    onClick={ 
                        () => {
                            history.push(`/invitation/${ invitation._id }`)
                        }
                    }
                    tooltipText="View Invitation"
                >
                    <i className="fas fa-eye"></i>
                </CircleButton>
        </div>
    );
};

InvitationNotification.propTypes = {
    invitation: PropTypes.object.isRequired
};

export default InvitationNotification;