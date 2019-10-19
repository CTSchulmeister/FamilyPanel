import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logUserOut } from '../../actions/authActions';

const LogOutButton = (props) => {
    let text = null;
    if(props.showText) {
        text = 'Log Out'
    }

    return (
        <Link to="/" className="top-bar-button" onClick={ () => props.logUserOut() } title="Log Out">
            <i className="fas fa-sign-out-alt"></i> { text }
        </Link>
    );
};

export default connect(null, { logUserOut })(LogOutButton);