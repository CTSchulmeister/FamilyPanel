import React from 'react';
import { connect } from 'react-redux';

import SectionHeader from '../Layout/SectionHeader';
import Greeting from './Greeting';

const Profile = props => {
    return (
        <section className="profile">
            <SectionHeader title="Profile" />
            <Greeting />
        </section>
    )
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.user.authenticated,
        isLoading: state.user.loading || state.households.loading
    };
}

export default connect(mapStateToProps)(Profile);