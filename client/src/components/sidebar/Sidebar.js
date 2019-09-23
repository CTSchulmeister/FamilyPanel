import React from 'react';
import './SideBar.scss';
import PropTypes from 'prop-types';

import SideBarGroup from '../SideBarGroup/SideBarGroup';

const SideBar = (props) => {
    const SideBarGroups = [
        'home',
        'members',
        'events',
        'tasks',
        'notes'
    ].map(value => {
        if(value === props.view) {
            return (
                <SideBarGroup
                    type={ value }
                    active={ true }
                    key={ value }
                />
            );
        } else {
            return (
                <SideBarGroup
                    type={ value }
                    key={ value }
                />
            );
        }
    });

    return (
        <aside className="side-bar">
            <a href="/" className="side-bar__logo">
                <h1>Family Panel</h1>
            </a>

            <div className="side-bar__main">
                <div className="side-bar__header">
                    <span className="side-bar__sub-heading">Household</span>
                    <h2 className="side-bar__household-name">{ props.householdName }</h2>
                </div>

                <nav className="side-bar__buttons">
                    { SideBarGroups }
                </nav>
            </div>
        </aside>
    )
}

SideBar.propTypes = {
    view: PropTypes.oneOf([
        'home',
        'members',
        'events',
        'tasks',
        'notes'
    ])
}

export default SideBar;