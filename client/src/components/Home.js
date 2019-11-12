import React from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal';
import AppContainer from '../containers/AppContainer';
import HomeSettingsContainer from '../containers/HomeSettingsContainer';
import InvitationModalContentContainer from '../containers/InvitationModalContentContainer';
import SectionHeader from './SectionHeader';
import CircleButton from './CircleButton';

const Home = ({
    user,
    currentHousehold
}) => {
    let canInvite;

    if(currentHousehold) {
        canInvite = (
            currentHousehold.settings.allMembersCanInvite || 
            currentHousehold._ownerId === user._id
        );
    }

    return (
        <AppContainer activeLink="home">
            <section className="home">
                <SectionHeader title="Home">
                    <Modal>
                        <CircleButton
                            light={ true }
                            disabled={ !canInvite }
                            tooltipText="Invite Member"
                        >
                            <i className="fas fa-user-plus"></i>
                        </CircleButton>
                        <InvitationModalContentContainer />
                    </Modal>
                </SectionHeader>
                <HomeSettingsContainer />
            </section>
        </AppContainer>
    );
};

Home.propTypes = {
    user: PropTypes.object.isRequired,
    currentHousehold: PropTypes.object.isRequired
};

export default Home;