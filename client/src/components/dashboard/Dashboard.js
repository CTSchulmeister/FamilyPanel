import React from 'react';
import './Dashboard.scss';

import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import Main from '../Main/Main';

const Dashboard = (props) => {
    return (
        <div className="dashboard">
            <TopBar user={ props.user } hello="Hey!"/>
            <SideBar view={ props.view } household="PH Household Name"/>
            <Main view={ props.view }/>
        </div>
    );
};

export default Dashboard;