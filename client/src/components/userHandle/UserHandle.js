import React from 'react';
import './UserHandle.scss';

const UserHandle = (props) => {
    return (
        <a href='/profile' className="user-handle">
            <span className="user-handle__name">{ props.firstName }&nbsp;{ props.lastName }</span>
            <img 
                className="user-handle__picture" 
                src={ process.env.PUBLIC_URL + '/anonymousProfilePicture.png ' } 
                alt={ `${ props.firstName } ${ props.lastName }`}
            />
        </a>
    );
};

export default UserHandle;