import React, { Component } from 'react';
import './TopbarButton.scss';

class TopbarButton extends Component {
    constructor(props) {
        super(props);

        switch(props.type) {
            case 'messages':
                this.title = 'Messages';
                this.icon = <i className="far fa-envelope"></i>;
                break;
            case 'notifications':
                this.title = 'Notifications';
                this.icon = <i className="far fa-bell"></i>;
                break;
            case 'settings':
                this.title = 'Settings';
                this.icon = <i className="fas fa-sliders-h"></i>
                break;
            default:
                throw new Error(`Invalid type value given.  Must be 'messages', 'notifications', or 'settings'`);
        }

        this.route = (props.route) ? props.route : '#';
    }

    render() {
        return (
            <a href={ this.route } className="topbar-button">
                { this.icon }
            </a>
        )
    }
}

export default TopbarButton;