import React from 'react';

import './TopBar.scss';

import TopBarButton from '../TopBarButton/TopBarButton';
import UserHandle from '../UserHandle/UserHandle';
import LogOutButton from '../LogOutButton/LogOutButton';

const TopBar = (props) => {
    return (
        <header className="top-bar">
            <div className="top-bar__search-bar">
                &nbsp;
            </div>

            <hr className="top-bar__divider" />

            <div className="top-bar__buttons">
                <TopBarButton type="notifications" />
                <TopBarButton type="messages" />
                <TopBarButton type="settings" />
                <LogOutButton />
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