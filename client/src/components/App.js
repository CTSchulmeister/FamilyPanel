import React from 'react';
import { connect } from 'react-redux';

import Landing from './Landing/Landing';
import DashboardContainer from './Dashboard/DashboardContainer';

const App = (props) => {
    let viewToRender = props.view ? props.view : null;
    let componentToRender;
    
    if(props.isAuthenticated) {
        if(!viewToRender) {
            componentToRender = <DashboardContainer view="home" />
        } else {
            componentToRender = <DashboardContainer view={ viewToRender } />
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
        view: state.view,
        isAuthenticated: state.auth.authenticated,
        user: state.auth.user
    };
}

export default connect(mapStateToProps)(App);