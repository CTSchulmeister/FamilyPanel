import React from 'react';
import PropTypes from 'prop-types';

import DropDown from './DropDown';
import TopBarButton from './TopBarButton';
import LogOutButtonContainer from '../containers/LogOutButtonContainer';
import NotificationsContainer from '../containers/NotificationsContainer';

const TopBarButtonsGroup = ({
    invitations,
    history
}) => {
    const hasNotifications = invitations.length > 0;

    return (
        <div className="top-bar__buttons">
            <DropDown>
                <TopBarButton hasNotifications={ hasNotifications }>
                    <i className="far fa-bell"></i>
                </TopBarButton>
                <NotificationsContainer />
            </DropDown>
            <LogOutButtonContainer history={ history } />
        </div>
    );
};

TopBarButtonsGroup.propTypes = {
    invitations: PropTypes.array.isRequired
};

export default TopBarButtonsGroup;