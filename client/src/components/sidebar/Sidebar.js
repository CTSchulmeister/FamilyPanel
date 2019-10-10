import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SideBar.scss';
import { showHouseholdCreationForm, hideHouseholdCreationForm } from '../../actions/viewActions';

import SideBarGroup from '../SideBarGroup/SideBarGroup';
import CreateHouseholdForm from '../CreateHouseholdForm/CreateHouseholdForm';

class SideBar extends Component {
    constructor(props) {
        super(props);

        this.toggleHouseholdCreationForm.bind(this);

        this.createHouseholdFormWrapper = React.createRef();
    }

    toggleHouseholdCreationForm = () => {
        if(this.props.householdCreationFormIsActive) {
            this.createHouseholdFormWrapper.current.className = 'side-bar__household-create-form-wrapper deactivated-form';

            setTimeout(() => {
                this.props.hideHouseholdCreationForm();
            }, 600);
        } else {
            this.props.showHouseholdCreationForm();
        } 
    }

    render() {
        let householdSection;
        let sideBarGroups;
        let sideBarGroupsWrapper;
        
        let householdForm = (this.props.householdCreationFormIsActive)
            ?
            <div className="side-bar__household-create-form-wrapper activated-form" ref={ this.createHouseholdFormWrapper }>
                <CreateHouseholdForm/>
            </div>
            : null;

        if(!this.props.currentHousehold || this.props.currentHousehold === '') {
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

            sideBarGroupsWrapper = <nav className="side-bar__buttons">{ sideBarGroups }</nav>

            householdSection = (
                <div className="side-bar__no-household">
                    <div className="side-bar__header">
                        <span className="side-bar__sub-heading">
                            You have no households...
                        </span>
                        <button className="button button--med button--create-household" onClick={ this.toggleHouseholdCreationForm }>
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

            sideBarGroupsWrapper = <nav className="side-bar__buttons--full">{ sideBarGroups }</nav>

            householdSection = (
                <div className="side-bar__households">
                    <div className="side-bar__header">
                        <span className="side-bar__sub-heading">
                            Household
                        </span>
                        <h2 className="side-bar__household-name">
                            { this.props.currentHousehold.name }
                        </h2>
                        { householdForm }
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
    
                    { sideBarGroupsWrapper }
                </div>
            </aside>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        view: state.view.currentView,
        householdCreationFormIsActive: state.view.householdCreationFormIsActive,
        user: state.auth.user,
        households: state.households.households,
        currentHousehold: state.households.currentHousehold
    };
}

export default connect(mapStateToProps, { showHouseholdCreationForm, hideHouseholdCreationForm })(SideBar);