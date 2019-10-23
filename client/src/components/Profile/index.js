import React from 'react';
import { connect } from 'react-redux';

import TopBar from '../TopBar';
import SideBar from '../SideBar';
import Spinner from '../Spinner';

import RequiresAuthentication from '../RequiresAuthentication';

const Profile = (props) => {
    if(props.isLoading) {
        return (
            <div className="fullscreen-wrapper">
                <Spinner/>
            </div>
        );
    } else {
        if(props.isAuthenticated) {
            return (
                <div className="app-container">
                    <TopBar />
                    <SideBar activeLink="profile" />
                    <div className="main profile__wrapper">
                        <section className="profile__view">
                        </section>
                    </div>
                </div>
            );
        } else {
            return (
                <RequiresAuthentication />
            );
        }
    }
    
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.user.authenticated,
        isLoading: state.user.loading || state.households.loading
    };
}

export default connect(mapStateToProps)(Profile);