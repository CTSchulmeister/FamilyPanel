import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    selectInvitations
} from '../../reducers/selectors';

import TopBarButton from './TopBarButton';
import LogOut from '../../containers/LogOut';
import NotificationsDropDown from './NotificationsDropDown';

import DropDown from '../DropDown';

class TopBarButtons extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNotificationsDropDown: false
        };

        this.toggleNotifications.bind(this);
    }

    toggleNotifications = () => {
        this.setState({
            showNotificationsDropDown: (this.state.showNotificationsDropDown) ? false : true
        });
    };

    render() {
        return (
            <div className="top-bar__buttons">
                <DropDown>
                    <TopBarButton hasNotifications={ this.props.invitations.length > 0 }>
                        <i className="far fa-bell"></i>
                    </TopBarButton>
                    <NotificationsDropDown 
                        invitations={ this.props.invitations}
                    />
                </DropDown>
                <LogOut history={ this.props.history } />
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        invitations: selectInvitations(state)
    };
};

export default connect(mapStateToProps)(TopBarButtons);