import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SideBar.scss';

import SideBarGroup from '../SideBarGroup/SideBarGroup';
import CreateHouseholdForm from '../CreateHouseholdForm/CreateHouseholdForm';

class SideBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showCreateHouseholdButton: false
        };

        this.sideBarHeaderRef = React.createRef();

        this.showHouseholdCreationForm.bind(this);
    }

    showHouseholdCreationForm = (event) => {
        if(!this.state.showCreateHouseholdButton) {
            this.setState({
                showCreateHouseholdButton: true
            });
        } else {
            this.setState({
                showCreateHouseholdButton: false
            });
        }        
    };

    render() {
        let householdSection;
        let sideBarGroups;

        if(this.props.user._householdIds.length === 0) {
            sideBarGroups = [
                'profile',
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
            })

            let householdForm = (this.state.showCreateHouseholdButton)
                ? (
                    <div className="side-bar__household-create-form-wrapper">
                        <CreateHouseholdForm />
                    </div>
                )
                : null;

            householdSection = (
                <div className="side-bar__no-household">
                    <div className="side-bar__header">
                        <span className="side-bar__sub-heading">
                            You have no households...
                        </span>
                        <button className="side-bar__create-household-button" onClick={ this.showHouseholdCreationForm }>
                            Create one!
                        </button>
                        { householdForm }
                    </div>
                </div>
            );
        } else {
            sideBarGroups = [
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

            householdSection = (
                <div className="side-bar__households">
                    <div className="side-bar__header">
                        <span classNAme="side-bar__sub-heading">
                            Household
                        </span>
                        <h2 className="side-bar__household-name">
                            { this.props.householdName }
                        </h2>
                    </div>
                </div>
            );
        }

        return (
            <aside className="side-bar">
                <a href="/" className="side-bar__logo">
                    <h1>Family Panel</h1>
                </a>
    
                <div className="side-bar__main">
                    { householdSection }
    
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