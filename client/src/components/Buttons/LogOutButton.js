import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LogOutButton = ({
    handleLogOut
}) => {
    return (
        <Link to="/" className="top-bar__button" onClick={ handleLogOut } title="Log Out">
            <i className="fas fa-sign-out-alt"></i> 
        </Link>
    );
};

LogOutButton.propTypes = {
    handleLogOut: PropTypes.func.isRequired
};

export default LogOutButton;