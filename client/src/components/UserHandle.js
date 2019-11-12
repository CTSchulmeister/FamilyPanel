import React from 'react';
import PropTypes from 'prop-types';

const UserHandle = ({
    history,
    user
}) => {
    return (
        <button 
            className="user-handle" 
            onClick={ 
                () => history.push('/profile') 
            }
        >
            <span className="user-handle__name">
                { user.firstName } { user.lastName }
            </span>
            <img 
                className="user-handle__picture" 
                src={ process.env.PUBLIC_URL + '/anonymousProfilePicture.png ' } 
                alt={ `${ user.firstName } ${ user.lastName }` }
            />
        </button>
    );
};

UserHandle.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserHandle;