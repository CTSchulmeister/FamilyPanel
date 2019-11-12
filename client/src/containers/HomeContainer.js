import React from 'react';
import { connect } from 'react-redux';
import {
    selectUser
} from '../selectors/userSelectors';
import {
    selectCurrentHousehold
} from '../selectors/householdSelectors';

import Home from '../components/Home';

const HomeContainer = props => <Home { ...props } />;

const mapStateToProps = state => ({
    user: selectUser(state),
    currentHousehold: selectCurrentHousehold(state)
});

export default connect(mapStateToProps)(HomeContainer);