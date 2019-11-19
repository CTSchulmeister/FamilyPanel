import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SideBarGroup = ({
    type,
    active
}) => {
    let title, icon, route;

    switch(type) {
        case 'profile':
            title = 'Profile';
            icon = <i className="fas fa-user"></i>;
            route = '/profile';
            break;
        case 'home':
            title = 'Home';
            icon = <i className="fas fa-home"></i>;
            route = '/home';
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
            throw new Error(`Invalid type prop given to SideBarGroup.  Recieved ${ type }`);
    }

    const className = (active)
        ? 'side-bar-group--active'
        : 'side-bar-group';

    return (
        <Link to={ route } className={ className } aria-label={ title }>
            <div className="side-bar-group__icon">
                { icon }
            </div>
            { title }
        </Link>
    );
};

SideBarGroup.propTypes = {
    active: PropTypes.bool.isRequired,
    type: PropTypes.oneOf([
        'profile',
        'home',
        'notes'
    ]).isRequired
};

export default SideBarGroup;