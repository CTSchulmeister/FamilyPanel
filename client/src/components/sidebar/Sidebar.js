import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SideBar.scss';

import SideBarGroup from '../SideBarGroup/SideBarGroup';

class SideBar extends Component {
    render() {
        let sideBarGroups = [
            'profile',
            'home',
            'members',
            'events',
            'tasks',
            'notes'
        ].map(value => {
            if(value === this.props.view) {
                return (
                    <SideBarGroup
                        type={ value }
                        active={ true }
                        key={ value }
                    />
                )
            } else {
                return (
                    <SideBarGroup
                        type={ value }
                        active={ false }
                        key={ value }
                    />
                );
            }
        });

        let householdSelector;

        return (
            <aside className="side-bar">
                <a href="/" className="side-bar__logo">
                    <h1>Family Panel</h1>
                </a>
    
                <div className="side-bar__main">
                    <div className="side-bar__header">
                        <span className="side-bar__sub-heading">Household</span>
                        <h2 className="side-bar__household-name">{ this.props.householdName }</h2>
                    </div>
    
                    <nav className="side-bar__buttons">
                        { sideBarGroups }
                    </nav>
                </div>
            </aside>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        view: state.view.currentView,
        user: state.auth.user
    };
}

export default connect(mapStateToProps)(SideBar);