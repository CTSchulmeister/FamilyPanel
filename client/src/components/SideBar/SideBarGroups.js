import React from 'react';
import { connect } from 'react-redux';

import SideBarGroup from './SideBarGroup';

const SideBarGroups = props => {
    if(props.households && props.households.length > 0) {
        return (
            <nav className="side-bar__groups">
                <SideBarGroup
                    type='profile'
                    active={ props.activeLink === 'profile' }
                />
                <SideBarGroup
                    type='home'
                    active={ props.activeLink === 'home' }
                />
                <SideBarGroup
                    type='notes'
                    active={ props.activeLink === 'notes' }
                />
            </nav>
        );
    } else {
        return (
            <nav className="side-bar__groups">
                <SideBarGroup
                    type='profile'
                    active= { props.activeLink === 'profile' }
                />
            </nav>
        );
    }
};

const mapStateToProps = state => {
    return {
        households: state.households.households
    };
}

export default connect(mapStateToProps)(SideBarGroups);