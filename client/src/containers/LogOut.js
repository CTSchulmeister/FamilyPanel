import React from 'react';
import { connect } from 'react-redux';
import { logUserOut } from '../actions/userActions';

import LogOutButton from '../components/Buttons/LogOutButton';

const handleLogOut = async props => {
    try {
        await props.logUserOut();

        props.history.push('/');
    } catch (error) {
        // TODO: Handle error;
        alert(`Error encountered logging out: ${ error }`);
    }
};

const LogOut = props => <LogOutButton handleLogOut={ () => handleLogOut(props) } />;

export default connect(null, {
    logUserOut
})(LogOut);