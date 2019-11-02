import React from 'react';

const UserOption = props => {
    const className = (props.isActive)
        ? 'user-option--active'
        : 'user-option';

    return (
        <div className={ className } onClick={ () => props.onClick(props.user._id) } value={ props.user._id }>
            <div className="user-option__picture-wrapper">
                <img 
                    className="user-option__picture" 
                    src={ process.env.PUBLIC_URL + '/anonymousProfilePicture.png' }
                    alt={ `${ props.user.firstName } ${ props.user.lastName }` }
                />
            </div>
            <div className="user-option__name">
                { `${ props.user.firstName } ${ props.user.lastName }` }
            </div>
        </div>
    );
};

export default UserOption;