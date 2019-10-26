import React from 'react';

import TopBarButton from './TopBarButton';
import UserHandle from './UserHandle';
import LogOutButton from './LogOutButton';

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

            <UserHandle />
        </header>
    );
}

export default TopBar;