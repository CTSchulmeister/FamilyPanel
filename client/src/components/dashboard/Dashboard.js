import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Dashboard.scss';

import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import Main from '../Main/Main';

class Dashboard extends Component {
    render() {
        return (
            <div className="dashboard">
                <TopBar user={ this.props.user } hello="Hey!"/>
                <SideBar householdName="PH Household Name"/>
                <Main view={ this.props.view }/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.authenticated,
        user: state.auth.user,
        view: state.view.currentView
    };
}

export default connect(mapStateToProps)(Dashboard);