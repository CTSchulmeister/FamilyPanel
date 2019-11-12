import React from 'react';
import PropTypes from 'prop-types';
import { handledLinks } from '../constants';

import Logo from './Logo';
import SideBarHeaderContainer from '../containers/SideBarHeaderContainer';
import SideBarGroupsContainer from '../containers/SideBarGroupsContainer';

const SideBar = ({
    activeLink
}) => {
    return (
        <aside className="side-bar">
            <Logo />
            <div className="side-bar__main">
                <SideBarHeaderContainer />
                <SideBarGroupsContainer activeLink={ activeLink } />
            </div>
        </aside>
    ); 
};

SideBar.propTypes = {
    activeLink: PropTypes.oneOf(handledLinks).isRequired
};

export default SideBar;