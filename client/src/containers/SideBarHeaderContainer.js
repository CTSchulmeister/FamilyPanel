import React from 'react';
import { connect } from 'react-redux';
import {
    selectCurrentHousehold,
    selectHouseholds
} from '../selectors/householdSelectors';
import {
    changeCurrentHousehold
} from '../actions/householdActions';
import history from '../history';

import SideBarHeader from '../components/SideBarHeader';

const SideBarHeaderContainer = props => <SideBarHeader { ...props } history={ history } />;

const mapStateToProps = state => ({
    households: selectHouseholds(state),
    currentHousehold: selectCurrentHousehold(state)
});

export default connect(mapStateToProps, {
    changeCurrentHousehold
})(SideBarHeaderContainer);