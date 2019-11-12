import React from 'react';
import { connect } from 'react-redux';
import {
    selectUser,
    selectUserLoadingState
} from '../selectors/userSelectors';
import { 
    selectHouseholdLoadingState 
} from '../selectors/householdSelectors';

import Profile from '../components/Profile';

const ProfileContainer = props => <Profile { ...props } />;

const mapStateToProps = state => ({
    user: selectUser(state),
    userIsLoading: selectUserLoadingState(state),
    householdIsLoading: selectHouseholdLoadingState(state)
});

export default connect(mapStateToProps)(ProfileContainer)