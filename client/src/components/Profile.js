import React from 'react';
import PropTypes from 'prop-types';

import SectionHeader from './SectionHeader';
import Greeting from './Greeting';
import AppContainer from '../containers/AppContainer';

const Profile = ({
    user
}) => {
    return (
        <AppContainer activeLink="profile">
            <section className="profile">
                <SectionHeader title="Profile" />
                <Greeting user={ user } />
            </section>
        </AppContainer>
    );
};

Profile.propTypes = {
    user: PropTypes.object.isRequired
};

export default Profile;