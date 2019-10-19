import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class SideBarGroup extends Component {
    constructor(props) {
        super(props);

        switch(this.props.type) {
            case 'profile':
                this.title = 'Profile';
                this.icon = <i className="fas fa-user"></i>;
                this.view = 'profile';
                this.route = '/profile';
                break;
            case 'home':
                this.title = 'Home';
                this.icon = <i className="fas fa-home"></i>;
                this.view = 'home';
                this.route = '/home';
                break;
            case 'members':
                this.title = 'Members';
                this.icon = <i className="fas fa-user-friends"></i>;
                this.view = 'members';
                this.route = '/members';
                break;
            case 'events':
                this.title = 'Events';
                this.icon = <i className="fas fa-calendar"></i>;
                this.view = 'events';
                this.route = '/events';
                break;
            case 'tasks':
                this.title = 'Tasks';
                this.icon = <i className="fas fa-tasks"></i>;
                this.view = 'tasks';
                this.route = '/tasks';
                break;
            case 'notes':
                this.title = 'Notes';
                this.icon = <i className="fas fa-sticky-note"></i>;
                this.view = 'notes';
                this.route = '/notes';
                break;
            default:
                throw new Error(`Invalid type value given.  Must be 'profile', 'home', 'members', 'events', tasks', or 'notes'`);
        }
    }

    render() {
        let className = (this.props.active) ? 'side-bar-group--active' : 'side-bar-group';

        return (
            <Link to={ this.route } className={ className } aria-label={ this.title }>
                <div className="side-bar-group__icon">
                    { this.icon }
                </div>
                { this.title }
            </Link>
        );   
    }
};

SideBarGroup.propTypes = {
    type: PropTypes.oneOf([
        'profile',
        'home',
        'members',
        'events',
        'tasks',
        'notes'
    ])
}

export default SideBarGroup;