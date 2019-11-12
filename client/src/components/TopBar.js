import React from 'react';

import TopBarButtonsGroupContainer from '../containers/TopBarButtonsGroupContainer';
import UserHandleContainer from '../containers/UserHandleContainer';

const TopBar = props => {
    return (
        <header className="top-bar">
            <div className="top-bar__search-bar">
                &nbsp;
            </div>

            <hr className="top-bar__divider" />

            <TopBarButtonsGroupContainer />

            <hr className="top-bar__divider" />

            <UserHandleContainer />
        </header>
    );
};

export default TopBar;