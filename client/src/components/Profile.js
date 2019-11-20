import React from 'react';
import PropTypes from 'prop-types';
import isRequiredIf from 'react-proptype-conditional-require';

import SectionHeader from './SectionHeader';
import Greeting from './Greeting';
import AppContainer from '../containers/AppContainer';

const Profile = ({
    isAuthenticated,
    user
}) => {
    let content = null;

    if(isAuthenticated) {
        content = (
            <section className="profile">
                <SectionHeader title="Profile" />
                <Greeting user={ user } />
            </section>
        );
    }

    return (
        <AppContainer activeLink="profile">
            { content }
        </AppContainer>
    );
};

Profile.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: isRequiredIf(PropTypes.object, props => props.isAuthenticated === true)
};

export default Profile;