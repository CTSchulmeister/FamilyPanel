import React from 'react';
import PropTypes from 'prop-types'

import SideBarGroup from './SideBarGroup';

const SideBarGroups = ({
    activeLink,
    households
}) => {
    if(households && households.length > 0) {
        return (
            <nav className="side-bar__groups">
                <SideBarGroup
                    type='profile'
                    active={ activeLink === 'profile' }
                />
                <SideBarGroup
                    type='home'
                    active={ activeLink === 'home' }
                />
                <SideBarGroup
                    type='tasks'
                    active={ activeLink === 'tasks' }
                />
                <SideBarGroup
                    type='notes'
                    active={ activeLink === 'notes' }
                />
            </nav>
        );
    } else {
        return (
            <nav className="side-bar__groups">
                <SideBarGroup
                    type='profile'
                    active= { activeLink === 'profile' }
                />
            </nav>
        );
    }
};

SideBarGroups.propTypes = {
    activeLink: PropTypes.string.isRequired,
    households: PropTypes.array
};

export default SideBarGroups;