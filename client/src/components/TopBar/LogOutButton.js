import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logUserOut } from '../../actions/userActions';

const LogOutButton = (props) => {
    let text = null;
    if(props.showText) {
        text = 'Log Out'
    }

    const handleLogOut = async () => {
        await props.logUserOut();

        props.history.push('/');
    };

    return (
        <Link to="/" className="top-bar__button" onClick={ handleLogOut } title="Log Out">
            <i className="fas fa-sign-out-alt"></i> { text }
        </Link>
    );
};

export default connect(null, { logUserOut })(LogOutButton);