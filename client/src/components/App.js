import React from 'react';
import { connect } from 'react-redux';

import Landing from './Landing/Landing';
import Dashboard from './Dashboard/Dashboard';

const App = (props) => {
    let viewToRender = props.view ? props.view : null;
    let componentToRender;
    
    if(props.isAuthenticated) {
        if(!viewToRender) {
            componentToRender = <Dashboard view="profile" />
        } else {
            componentToRender = <Dashboard view={ viewToRender } />
        }
    } else {
        componentToRender = <Landing />;
    }

    return (
        <div>
            { componentToRender }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.user.authenticated,
        user: state.user.user
    };
}

export default connect(mapStateToProps)(App);