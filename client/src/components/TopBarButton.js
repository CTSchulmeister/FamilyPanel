import React from 'react';
import PropTypes from 'prop-types';

const TopBarButton = props => {
    const className = (props.hasNotifications)
        ? 'top-bar__button--notifications'
        : 'top-bar__button';

    return (
        <button 
            className={ className }
            onClick={ props.onClick || null }
        >
            { props.children }
        </button>
    );
};

TopBarButton.propTypes = {
    onClick: PropTypes.func
};

export default TopBarButton;