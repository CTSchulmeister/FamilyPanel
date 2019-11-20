import React from 'react';
import PropTypes from 'prop-types';

import AppContainer from '../containers/AppContainer';
import SectionHeader from './SectionHeader';
import InvitationContent from './InvitationContent';

const Invitation = props => {
    const mainSection = (props.invitation === null)
        ? (
            <div className="invitation--no-invitation">
                No invitation was found matching the passed ID.
            </div>
        )
        : (
            <InvitationContent { ...props } /> 
        );

    return (
        <AppContainer activeLink={ '' }>
            { props.isAuthenticated &&
            <section className="invitation">
                <SectionHeader title="Invitation" />
                { mainSection }
            </section>
            }
        </AppContainer>
    );
};

Invitation.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    acceptInvitation: PropTypes.func.isRequired,
    deleteInvitation: PropTypes.func.isRequired,
    invitation: PropTypes.object
};

export default Invitation;