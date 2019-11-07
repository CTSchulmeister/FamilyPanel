import React, { Component } from 'react';

import CircleButton from '../Buttons/CircleButton';
import ViewInvitationModal from '../Modals/ViewInvitationModal';
import Modal from '../Modals';

class InvitationNotification extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            showInvitationView: false
        };

        this.toggleInvitationView.bind(this);
    }

    toggleInvitationView = () => {
        this.setState({
            showInvitationView: !this.state.showInvitationView
        });
    };

    render() {
        return (
            <div className="invitation-notification">
                <div className="invitation-notification__text">
                    <span className="invitation-notification__subheading">
                        Invitation to join
                    </span>
                    <span className="invitation-notification__heading">
                        { this.props.invitation.householdName }
                    </span>
                </div>
                <Modal>
                    <CircleButton
                        light={ false }
                        tooltipText="View"
                    >
                        <i className="fas fa-hand-pointer"></i>
                    </CircleButton>
                    <ViewInvitationModal 
                        invitation={ this.props.invitation }
                    />
                </Modal>
            </div>
        );
    }    
};

export default InvitationNotification;