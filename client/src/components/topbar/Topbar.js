import React from 'react';

import './TopBar.scss';

import TopBarButton from '../TopBarButton/TopBarButton';
import UserHandle from '../UserHandle/UserHandle';

const TopBar = (props) => {
    return (
        <header className="top-bar">
            <div className="top-bar__search-bar">
                PH
            </div>

            <hr className="top-bar__divider" />

            <div className="top-bar__buttons">
                <TopBarButton type="notifications" />
                <TopBarButton type="messages" />
                <TopBarButton type="settings" />
            </div>

            <hr className="top-bar__divider" />

            <UserHandle
                firstName={ props.user.firstName }
                lastName={ props.user.lastName }
            />
        </header>
    );
}

export default TopBar;