import React from 'react';
import PropTypes from 'prop-types';

const UserPanel = props => {
    const {
        firstName,
        lastName,
        _id
    } = props.user;

    const className = (props.isRounded)
        ? 'user-panel--rounded'
        : 'user-panel';

    const onClick = (props.onClick)
        ? props.onClick
        : null;

    const role = (props.onClick || props.isDropDownTrigger || props.isButton)
        ? 'button'
        : 'figure';

    const caretIcon = (props.isDropDownTrigger)
        ? <i className="fas fa-caret-down"></i>
        : null;

    return (
        <div className={ className } onClick={ onClick } role={ role }>
            <div className="user-panel__picture-wrapper">
                <img 
                    className="user-panel__picture" 
                    src={ process.env.PUBLIC_URL + '/anonymousProfilePicture.png' }
                    alt={ `${ firstName } ${ lastName }` }
                />
            </div>
            <div className="user-panel__name-wrapper">
                { firstName } { lastName }
                { caretIcon }
            </div>
        </div>
    );
};

UserPanel.propTypes = {
    user: PropTypes.object.isRequired,
    onClick: PropTypes.func
};

export default UserPanel;