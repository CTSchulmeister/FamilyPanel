import React from 'react';
import PropTypes from 'prop-types';

import Heading from './Heading';
import Paragraph from './Paragraph';
import SubHeading from './SubHeading';
import Quotation from './Quotation';
import StandardButton from './StandardButton';

const InvitationContent = ({
    acceptInvitation,
    deleteInvitation,
    invitation,
    history
}) => {
    const handleAccept = async () => {
        await acceptInvitation(invitation._id);
        history.push('/profile');
    };

    const handleDecline = async () => {
        await deleteInvitation(invitation._id);
        history.push('/profile');
    };

    return (
        <div className="invitation-content__wrapper">
            <div className="invitation-content">
                <Heading
                    light={ false }
                    divider="colored"
                >
                    You're invited!
                </Heading>
                <Paragraph>
                    You were invited to { invitation.householdName }
                </Paragraph>
                { invitation.message &&
                    <React.Fragment>
                        <SubHeading
                            light={ false }
                        >
                            Message:
                        </SubHeading>
                        <Quotation
                            light={ false }
                        >
                            { invitation.message }
                        </Quotation>
                    </React.Fragment>
                }
                <div className="invitation-content__buttons">
                    <StandardButton
                        size="medium"
                        onClick={ async () => await handleAccept() }
                    >
                        Accept
                    </StandardButton>
                    <StandardButton
                        size="medium"
                        onClick={ async () => await handleDecline() }
                    >
                        Decline
                    </StandardButton>
                </div>
            </div>
        </div>
    );
};

InvitationContent.propTypes = {
    invitation: PropTypes.object.isRequired,
    acceptInvitation: PropTypes.func.isRequired,
    deleteInvitation: PropTypes.func.isRequired
};

export default InvitationContent;