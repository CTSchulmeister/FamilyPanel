import React from 'react';
import { connect } from 'react-redux';
import {
    selectCurrentHousehold
} from '../selectors/householdSelectors';

import DisabledHomeSettings from '../components/DisabledHomeSettings';

const DisabledHomeSettingsContainer = props => <DisabledHomeSettings { ...props } />

const mapStateToProps = state => ({
    currentHousehold: selectCurrentHousehold(state)
}); 

export default connect(mapStateToProps)(DisabledHomeSettingsContainer);