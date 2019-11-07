import React from 'react';
import PropTypes from 'prop-types';

import RequiresAuthentication from './RequiresAuthentication';
import NoServerConnection from './NoServerConnection';

import TopBar from './TopBar';
import SideBar from './SideBar';
import Main from './Layout/Main';

import Spinner from './Spinner';

import Profile from './Profile';
import Home from './Home';
import Notes from './Notes';

const AppContainer = ({
    history,
    activeLink,
    isAuthenticated,
    isLoading,
    serverIsDown
}) => {
    if(serverIsDown) return <NoServerConnection history={ history } />;
    if(!isAuthenticated) return <RequiresAuthentication />;

    let componentToShow;

    if(isLoading) {
        componentToShow = <Spinner />;
    } else {
        switch(activeLink) {
            case 'profile':
                componentToShow = <Profile />;
                break;
            case 'home':
                componentToShow = <Home />;
                break;
            case 'notes':
                componentToShow = <Notes />;
                break;
            default:
                componentToShow = null;
        }
    }

    return (
        <div className="app-container">
            <TopBar history={ history } />
            <SideBar activeLink={ activeLink } />
            <Main>
                { componentToShow }
            </Main>
        </div>
    );
};

AppContainer.propTypes = {
    activeLink: PropTypes.oneOf([
        'profile',
        'home',
        'notes'
    ]).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    serverIsDown: PropTypes.bool.isRequired
};

export default AppContainer;