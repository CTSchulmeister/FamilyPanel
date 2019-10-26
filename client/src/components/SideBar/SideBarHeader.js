import React, { Component } from 'react';
import { connect } from 'react-redux';

import CreateHouseholdForm from '../CreateHouseholdForm/CreateHouseholdForm';
import HouseholdSelection from './HouseholdSelection';

import Heading from '../Typography/Heading';
import SubHeading from '../Typography/SubHeading';
import Divider from '../Decorative/Divider';

class SideBarHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showHouseholdSelection: false,
            showHouseholdCreation: false,
            caretIcon: <i className="fas fa-caret-down"></i>
        }

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
            showHouseholdSelection: (this.state.showHouseholdSelection) ? false : true,
            showHouseholdCreation: false,
            caretIcon: (this.state.showHouseholdSelection)
                ? <i className="fas fa-caret-down"></i> 
                : <i className="fas fa-caret-up"></i>
        });
    };

    handleHouseholdSelection = () => {
        this.setState({
            showHouseholdSelection: false
        });
    };

    render() {
        const householdSelection = (this.state.showHouseholdSelection)
            ? (
                <HouseholdSelection 
                    handleHouseholdSelection={ this.handleHouseholdSelection }
                    toggleHouseholdCreationForm={ this.toggleHouseholdCreationForm }
                />
            )
            : null;

        const householdCreation = (this.state.showHouseholdCreation)
            ? (
                <div className="side-bar__household-create-form-wrapper activated-form" ref={ this.createHouseholdFormWrapper }>
                    <CreateHouseholdForm />
                </div>
            )
            : null;

        if(this.props.currentHousehold) {
            return (
                <div className="side-bar__header">
                    <button className="side-bar__household-select-trigger" onClick={ this.toggleHouseholdSelection }>
                        <SubHeading light={ true } button={ true }>
                            Household&nbsp;
                            { this.state.caretIcon }
                        </SubHeading>
                    </button>
                    { householdSelection }
                    { householdCreation }
                    <Heading light={ true } divider='light'>
                        { this.props.currentHousehold.name }
                    </Heading>
                </div>
            );
        } else {
            return (
                <div className="side-bar__header">
                    <SubHeading light={ true }>
                        You have no households...
                    </SubHeading>
                    <br />
                    <button className="button button--med" onClick={ this.toggleHouseholdCreationForm }>
                        Create one!
                    </button>
                    <br />
                    { householdCreation }
                    <Divider color="light" size="large" />
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        households: state.households.households,
        currentHousehold: state.households.currentHousehold
    };
}

export default connect(mapStateToProps)(SideBarHeader);