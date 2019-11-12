import React, { Component } from 'react';

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
            </div>
        );
    }    
};

export default InvitationNotification;