import React from 'react';
import PropTypes from 'prop-types';
import './SideBarGroup.scss';

const SideBarGroup = (props) => {
    let title, icon, route;

    switch(props.type) {
        case 'home':
            title = 'Home';
            icon = <i className="fas fa-home"></i>;
            route = '/home';
            break;
        case 'members':
            title = 'Members';
            icon = <i className="fas fa-user-friends"></i>;
            route = '/members';
            break;
        case 'events':
            title = 'Events';
            icon = <i className="fas fa-calendar"></i>;
            route = '/events';
            break;
        case 'tasks':
            title = 'Tasks';
            icon = <i className="fas fa-tasks"></i>;
            route = '/tasks';
            break;
        case 'notes':
            title = 'Notes';
            icon = <i className="fas fa-sticky-note"></i>;
            route = '/notes';
            break;
        default:
            throw new Error(`Invalid type value given.  Must be 'home', 'members', 'events', tasks', or 'notes'`);
    }

    let className = (props.active) ? 'side-bar-group--active' : 'side-bar-group';

    return (
        <a href={ route } className={ className } aria-label={ title }>
            <div className="side-bar-group__icon">
                { icon }
            </div>
            { title }
        </a>
    );
};

SideBarGroup.propTypes = {
    type: PropTypes.oneOf([
        'home',
        'members',
        'events',
        'tasks',
        'notes'
    ])
}

export default SideBarGroup;