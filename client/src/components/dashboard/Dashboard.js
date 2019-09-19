import React, { Component } from 'react';
import './Dashboard.scss';

import Topbar from '../topbar/Topbar';
import Sidebar from '../sidebar/Sidebar';
import Main from '../main/Main';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="dashboard">
                <Topbar />
                <Sidebar
                    householdName="Super Long Household Name"
                />
                <Main />
            </div>
        );
    }
}

export default Dashboard;