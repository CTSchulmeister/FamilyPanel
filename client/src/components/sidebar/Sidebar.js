import React from 'react';
import './Sidebar.scss';

import SidebarGroup from '../sidebarGroup/SidebarGroup';

const Sidebar = (props) => {
    return (
        <aside className="sidebar">
            <a href="/" className="sidebar__logo">
                Family Panel
            </a>

            <div className="sidebar__main">
                <div className="sidebar__header">
                    <span className="sidebar__subheading">Household</span>
                    <h2 className="sidebar__household-name">{ props.householdName }</h2>
                </div>
                <nav className="sidebar__buttons">
                    <SidebarGroup
                        type="home"
                    />
                    <SidebarGroup 
                        type="members"
                    />
                    <SidebarGroup 
                        type="events"
                    />
                    <SidebarGroup 
                        type="tasks"
                    />
                    <SidebarGroup 
                        type="notes"
                        active="true"
                    />
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;