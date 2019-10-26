import React from 'react';
import { connect } from 'react-redux';

import SectionHeader from '../Layout/SectionHeader';

const Profile = props => {
    return (
        <section className="profile">
            <SectionHeader title="Profile" />
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