import React from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal';
import AppContainer from '../containers/AppContainer';
import HomeSettingsContainer from '../containers/HomeSettingsContainer';
import InvitationModalContentContainer from '../containers/InvitationModalContentContainer';
import SectionHeader from './SectionHeader';
import CircleButton from './CircleButton';
import DisabledHomeSettingsContainer from '../containers/DisabledHomeSettingsContainer';

const Home = ({
    user,
    currentHousehold
}) => {
    const inviteButton = (
        currentHousehold &&
        ( currentHousehold.settings.allMembersCanInvite ||
        currentHousehold._ownerId === user._id )
    )
        ? (
            <Modal>
                <CircleButton
                    light={ true }
                    tooltipText="Invite Member"
                >
                    <i className="fas fa-user-plus"></i>
                </CircleButton>
                <InvitationModalContentContainer />
            </Modal>
        )
        : null;

    const settings = (currentHousehold && currentHousehold._ownerId === user._id)
        ? <HomeSettingsContainer />
        : <DisabledHomeSettingsContainer />;

    return (
        <AppContainer activeLink="home">
            <section className="home">
                <SectionHeader title={ currentHousehold.name }>
                    { inviteButton }
                </SectionHeader>
                { settings }
            </section>
        </AppContainer>
    );
};

Home.propTypes = {
    user: PropTypes.object.isRequired,
    currentHousehold: PropTypes.object.isRequired
};

export default Home;