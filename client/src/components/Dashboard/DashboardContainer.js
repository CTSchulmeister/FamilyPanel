import React from 'react';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';

const DashboardContainer = (props) => {
    return (
        <Dashboard view={ props.view } user={ props.user }/>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.authenticated,
        user: state.auth.user
    };
}

export default connect(mapStateToProps)(DashboardContainer);