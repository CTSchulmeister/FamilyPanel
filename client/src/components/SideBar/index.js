import React from 'react';
import PropTypes from 'prop-types';

import SideBarHeader from './SideBarHeader';
import SideBarGroups from './SideBarGroups';

const SideBar = props => {
    return (
        <aside className="side-bar">
            <a href="/" className="side-bar__logo">
                <h1>Family Panel</h1>
            </a>

            <div className="side-bar__main">
                <SideBarHeader />
                <SideBarGroups activeLink={ props.activeLink } />
            </div>
        </aside>
    );
};

SideBar.propTypes = {
    activeLink: PropTypes.oneOf([
        'profile',
        'notes'
    ]).isRequired
};

export default SideBar;