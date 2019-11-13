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
        <AppContainer activeLink={ null }>
            <section className="invitation">
                <SectionHeader title="Invitation" />
                { mainSection }
            </section>
        </AppContainer>
    );
};

Invitation.propTypes = {
    acceptInvitaiton: PropTypes.func.isRequired,
    deleteInvitation: PropTypes.func.isRequired,
    invitation: PropTypes.oneOf([
        PropTypes.object,
        null
    ]).isRequired
};

export default Invitation;