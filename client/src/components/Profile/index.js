import React from 'react';
import { connect } from 'react-redux';
import {
    selectAuthenticationState,
    selectLoadingState
} from '../../reducers/selectors';

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
        isAuthenticated: selectAuthenticationState(state),
        isLoading: selectLoadingState(state)
    };
}

export default connect(mapStateToProps)(Profile);