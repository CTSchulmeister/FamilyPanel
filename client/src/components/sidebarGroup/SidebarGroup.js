import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeView } from '../../actions/viewActions';
import './SideBarGroup.scss';

class SideBarGroup extends Component {
    constructor(props) {
        super(props);

        switch(this.props.type) {
            case 'profile':
                this.title = 'Profile';
                this.icon = <i className="fas fa-user"></i>;
                this.view = 'profile';
                break;
            case 'home':
                this.title = 'Home';
                this.icon = <i className="fas fa-home"></i>;
                this.view = 'home';
                break;
            case 'members':
                this.title = 'Members';
                this.icon = <i className="fas fa-user-friends"></i>;
                this.view = 'members';
                break;
            case 'events':
                this.title = 'Events';
                this.icon = <i className="fas fa-calendar"></i>;
                this.view = 'events';
                break;
            case 'tasks':
                this.title = 'Tasks';
                this.icon = <i className="fas fa-tasks"></i>;
                this.view = 'tasks';
                break;
            case 'notes':
                this.title = 'Notes';
                this.icon = <i className="fas fa-sticky-note"></i>;
                this.view = 'notes';
                break;
            default:
                throw new Error(`Invalid type value given.  Must be 'profile', 'home', 'members', 'events', tasks', or 'notes'`);
        }

        this.changeView.bind(this);
    }

    changeView = () => {
        this.props.changeView(this.view);
    }

    render() {
        let className = (this.props.active) ? 'side-bar-group--active' : 'side-bar-group';

        return (
            <button className={ className } aria-label={ this.title } onClick={ this.changeView }>
                <div className="side-bar-group__icon">
                    { this.icon }
                </div>
                { this.title }
            </button>
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

export default connect(null, { changeView })(SideBarGroup);