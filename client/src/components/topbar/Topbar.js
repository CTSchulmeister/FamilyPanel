import React from 'react';
import './Topbar.scss';

import TopbarButton from '../topbarButton/TopbarButton';
import UserHandle from '../userHandle/UserHandle';

const Topbar = (props) => {
    return (
        <header className="topbar">
            <hr className="topbar__divider" />
            <div className="topbar__buttons">
                <TopbarButton type="notifications" />
                <TopbarButton type="messages" />
                <TopbarButton type="settings" />
            </div>
            <hr className="topbar__divider" />
            <UserHandle 
                name="John Smith"
            />
        </header>
    );
}

export default Topbar;