import React, { Component } from 'react';
import { connect } from 'react-redux';

import SideBarGroup from './SideBarGroup';
import HouseholdOption from './HouseholdOption';
import CreateHouseholdForm from '../CreateHouseholdForm/CreateHouseholdForm';

class SideBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showHouseholdSelection: false,
            showHouseholdCreation: false
        };

        this.toggleHouseholdCreationForm.bind(this);
        this.toggleHouseholdSelection.bind(this);
        this.handleHouseholdSelection.bind(this);

        this.createHouseholdFormWrapper = React.createRef();
    }

    toggleHouseholdCreationForm = () => {
        if(this.state.showHouseholdCreation) {
            this.createHouseholdFormWrapper.current.className = 'side-bar__household-create-form-wrapper deactivated-form';

            setTimeout(() => {
                this.setState({
                    showHouseholdCreation: false
                });
            }, 600);
        } else {
            this.setState({
                showHouseholdCreation: true
            });
        } 
    };

    toggleHouseholdSelection = () => {
        this.setState({
            showHouseholdSelection: (this.state.showHouseholdSelection) ? false : true
        });
    };

    handleHouseholdSelection = () => {
        this.setState({
            showHouseholdSelection: false
        });
    };

    render() {
        let householdSection;
        let sideBarGroups;
        let sideBarGroupsWrapper;
        
        let householdForm = (this.state.showHouseholdCreation)
            ?
            <div className="side-bar__household-create-form-wrapper activated-form" ref={ this.createHouseholdFormWrapper }>
                <CreateHouseholdForm/>
            </div>
            : null;

        if(!this.props.currentHousehold || this.props.currentHousehold === '') {
            sideBarGroups = [
                'profile',
            ].map(value => {
                if(value === this.props.activeLink) {
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
                <div className="side-bar__header">
                    <span className="side-bar__sub-heading">
                        You have no households...
                    </span>
                    <button className="button button--med button--create-household" onClick={ this.toggleHouseholdCreationForm }>
                        Create one!
                    </button>
                    { householdForm }
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
                if(value === this.props.activeLink) {
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

            sideBarGroupsWrapper = <nav className="side-bar__buttons">{ sideBarGroups }</nav>

            let selectorArrow = <i className="fas fa-caret-down"></i>;
            let householdSelect = null;
            
            if(this.state.showHouseholdSelection) {
                selectorArrow = <i className="fas fa-caret-up"></i>;

                let households = [];
                this.props.households.forEach(household => {
                    households.push(
                        <HouseholdOption 
                            key={ household._id }
                            id={ household._id }
                            name={ household.name }
                            closeWindow={ this.handleHouseholdSelection }
                        />
                    );
                });

                householdSelect = (
                    <div className="side-bar__household-select">
                        <button className="button button--wide" onClick={ this.toggleHouseholdCreationForm }>Create Household</button>
                        { householdForm }
                        { households }
                    </div>
                );
            }

            householdSection = (
                <div className="side-bar__header">
                    <button className="side-bar__sub-heading side-bar__household-select-trigger" onClick={ this.toggleHouseholdSelection }>
                        Household { selectorArrow }
                    </button>
                    { householdSelect }
                    <h2 className="side-bar__household-name">
                        { this.props.currentHousehold.name }
                    </h2>
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
        user: state.user.user,
        households: state.households.households,
        currentHousehold: state.households.currentHousehold
    };
}

export default connect(mapStateToProps)(SideBar);