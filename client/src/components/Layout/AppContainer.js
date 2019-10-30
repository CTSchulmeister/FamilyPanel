import React from 'react';
import { connect } from 'react-redux';
import { 
    selectAuthenticationState, 
    selectLoadingState 
} from '../../reducers/selectors';

import RequiresAuthentication from '../RequiresAuthentication';

import TopBar from '../TopBar';
import SideBar from '../SideBar';
import Main from './Main';

import Spinner from '../Spinner';

import Profile from '../Profile';
import Home from '../Home';
import Notes from '../Notes';

const AppContainer = props => {
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
        isLoading: selectLoadingState(state)
    };
};

export default connect(mapStateToProps)(AppContainer);