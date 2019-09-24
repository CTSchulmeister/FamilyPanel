import React from 'react';
import { connect } from 'react-redux';
import { logUserOut } from '../../actions/authActions';
import './LogOutButton.scss';

const LogOutButton = (props) => {
    let text = null;
    if(props.showText) {
        text = 'Log Out'
    }

    return (
        <button className="logout-button" onClick={ () => props.logUserOut() } title="Log Out">
            <i className="fas fa-sign-out-alt"></i> { text }
        </button>
    );
};

export default connect(null, { logUserOut })(LogOutButton);