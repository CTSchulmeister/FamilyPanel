import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    selectHouseholds
} from '../selectors/householdSelectors';
import { handledLinks } from '../constants';

import SideBarGroups from '../components/SideBarGroups';

const SideBarGroupsContainer = props => <SideBarGroups { ...props } />;

SideBarGroupsContainer.propTypes = {
    activeLink: PropTypes.oneOf(handledLinks).isRequired
};

const mapStateToProps = state => ({
    households: selectHouseholds(state)
});

export default connect(mapStateToProps)(SideBarGroupsContainer);