import React from 'react';
import { connect } from 'react-redux';
import {
    selectInvitations
} from '../selectors/invitationSelectors';
import history from '../history';

import TopBarButtonsGroup from '../components/TopBarButtonsGroup';

const TopBarButtonsGroupContainer = props => <TopBarButtonsGroup { ...props } history={ history } />;

const mapStateToProps = state => ({
    invitations: selectInvitations(state)
});

export default connect(mapStateToProps)(TopBarButtonsGroupContainer);