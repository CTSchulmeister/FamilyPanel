import React from 'react';

import TopBarButtons from './TopBarButtons';
import UserHandle from './UserHandle';


const TopBar = props => {
    return (
        <header className="top-bar">
            <div className="top-bar__search-bar">
                &nbsp;
            </div>

            <hr className="top-bar__divider" />

            <TopBarButtons history={ props.history } />

            <hr className="top-bar__divider" />

            <UserHandle history={ props.history } />
        </header>
    );
};

export default TopBar;