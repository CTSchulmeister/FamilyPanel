import React from 'react';
import { connect } from 'react-redux';
import {
    selectInvitations
} from '../selectors/invitationSelectors';

import Notifications from '../components/Notifications';

const NotificationsContainer = props => <Notifications { ...props } />;

const mapStateToProps = state => ({
    invitations: selectInvitations(state)
});

export default connect(mapStateToProps)(NotificationsContainer);