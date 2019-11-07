import React from 'react';
import { connect } from 'react-redux';
import { 
    selectAuthenticationState, 
    selectLoadingState,
    selectServerErrorStatus
} from '../../reducers/selectors';

import RequiresAuthentication from '../RequiresAuthentication';
import NoServerConnection from '../Connection/NoServerConnection';

import TopBar from '../TopBar';
import SideBar from '../SideBar';
import Main from './Main';

import Spinner from '../Spinner';

import Profile from '../Profile';
import Home from '../Home';
import Notes from '../Notes';

const AppContainer = props => {
    if(props.serverIsDown) {
        return (
            <NoServerConnection history={ props.history } />
        );
    }

    if(!props.isAuthenticated) return <RequiresAuthentication />;

    let componentToShow;

    if(props.isLoading) {
        componentToShow = <Spinner />;
    } else {
        switch(props.activeLink) {
            case 'profile':
                componentToShow = <Profile />;
                break;
            case 'home':
                componentToShow = <Home />;
                break;
            case 'notes':
                componentToShow = <Notes />;
                break;
            case 'invitation':
                componentToShow = <Invitation />;
                break;
            default:
                componentToShow = null;
        }
    }

    return (
        <div className="app-container">
            <TopBar history={ props.history } />
            <SideBar activeLink={ props.activeLink } />
            <Main>
                { componentToShow }
            </Main>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: selectAuthenticationState(state),
        isLoading: selectLoadingState(state),
        serverIsDown: selectServerErrorStatus(state)
    };
};

export default connect(mapStateToProps)(AppContainer);