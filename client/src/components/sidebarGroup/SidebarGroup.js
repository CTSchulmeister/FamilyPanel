import React, { Component } from 'react';
import './SidebarGroup.scss';

class SidebarGroup extends Component {
    constructor(props) {
        super(props);

        switch(props.type) {
            case 'home':
                this.title = 'Home';
                this.icon = <i className="fas fa-home"></i>;
                break;
            case 'members':
                this.title = 'Members';
                this.icon = <i className="fas fa-user-friends"></i>;
                break;
            case 'events':
                this.title = 'Events';
                this.icon = <i className="fas fa-calendar"></i>;
                break;
            case 'tasks':
                this.title = 'Tasks';
                this.icon = <i className="fas fa-tasks"></i>;
                break;
            case 'notes':
                this.title = 'Notes';
                this.icon = <i className="fas fa-sticky-note"></i>;
                break;
            default:
                throw new Error(`Invalid type value given.  Must be 'home', 'members', 'events', tasks', or 'notes'`);
        }
        
        this.route = (props.route) ? props.route : '#';

        this.className = (props.active) ? 'sidebar-group--active' : 'sidebar-group'; 
    }

    render() {
        return (
            <a href={ this.route } className={ this.className } aria-label={ this.title }>
                <div className="sidebar-group__icon">
                    { this.icon }
                </div>
                { this.title }
            </a>
        );
    }
}

export default SidebarGroup;