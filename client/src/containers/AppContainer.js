import React from 'react';
import PropTypes from 'prop-types';
import { handledLinks } from '../constants';
import { connect } from 'react-redux';
import {
    selectAuthenticationState
} from '../selectors/userSelectors';
import {
    selectServerErrorStatus
} from '../selectors/serverSelectors';

import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import MainContainer from './MainContainer';
import RequiresAuthentication from '../components/RequiresAuthentication';
import NoServerConnection from '../components/NoServerConnection';

const AppContainer = ({
    children,
    activeLink,
    isAuthenticated,
    serverIsDown
}) => {
    if(!isAuthenticated) return <RequiresAuthentication />;
    if(serverIsDown) return <NoServerConnection />;

    return (
        <div className="app-container">
            <TopBar />
            <SideBar activeLink={ activeLink } />
            <MainContainer children={ children } />
        </div>
    );
};

AppContainer.propTypes = {
    activeLink: PropTypes.oneOf(handledLinks)
};

const mapStateToProps = state => ({
    isAuthenticated: selectAuthenticationState(state),
    serverIsDown: selectServerErrorStatus(state)
});

export default connect(mapStateToProps)(AppContainer);