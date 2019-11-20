import React from 'react';
import { connect } from 'react-redux';
import {
    selectUser,
    selectAuthenticationState
} from '../selectors/userSelectors';

import Profile from '../components/Profile';

const ProfileContainer = props => <Profile { ...props } />;

const mapStateToProps = state => ({
    isAuthenticated: selectAuthenticationState(state),
    user: selectUser(state)
});

export default connect(mapStateToProps)(ProfileContainer)