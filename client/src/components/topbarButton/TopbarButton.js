import React from 'react';
import './TopBarButton.scss';
import PropTypes from 'prop-types';

const TopBarButton = (props) => {
    let title, icon, route;

    switch(props.type) {
        case 'messages':
            title = 'Messages';
            icon = <i className="far fa-envelope"></i>;
            route = '/messages';
            break;
        case 'notifications':
            title = 'Notifications';
            icon = <i className="far fa-bell"></i>;
            route = '/notifications';
            break;
        case 'settings':
            title = 'Settings';
            icon = <i className="fas fa-sliders-h"></i>
            route = '/settings'
            break;
        default:
            throw new Error(`Invalid type value given.  Must be 'messages', 'notifications', or 'settings'`);
    }

    return (
        <a href={ route } className="top-bar-button" title={ title }>
            { icon }
        </a>
    );
};

TopBarButton.propTypes = {
    type: PropTypes.oneOf([
        'messages',
        'notifications',
        'settings'
    ])
};

export default TopBarButton;