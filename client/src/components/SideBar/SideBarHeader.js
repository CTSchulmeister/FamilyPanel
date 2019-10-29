import React, { Component } from 'react';
import { connect } from 'react-redux';

import CreateHouseholdForm from '../CreateHouseholdForm/CreateHouseholdForm';
import HouseholdSelection from './HouseholdSelection';

import Heading from '../Typography/Heading';
import SubHeading from '../Typography/SubHeading';
import Divider from '../Decorative/Divider';
import StandardButton from '../Buttons/StandardButton';

class SideBarHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showHouseholdSelection: false,
            showHouseholdCreation: false
        }

        this.toggleHouseholdCreationForm.bind(this);
        this.toggleHouseholdSelection.bind(this);
        this.handleHouseholdSelection.bind(this);
        this.handleHouseholdCreation.bind(this);

        this.createHouseholdFormWrapper = React.createRef();
    }

    toggleHouseholdCreationForm = () => {
        this.setState({
            showHouseholdCreation: (this.state.showHouseholdCreation) ? false : true
        });
    };

    toggleHouseholdSelection = () => {
        this.setState({
            showHouseholdSelection: (this.state.showHouseholdSelection) ? false : true,
            showHouseholdCreation: false
        });
    };

    handleHouseholdCreation = () => {
        this.setState({
            showHouseholdCreation: false,
            showHouseholdSelection: false
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

        const caretIcon = (this.state.showHouseholdSelection)
            ? <i className="fas fa-caret-up"></i>
            : <i className="fas fa-caret-down"></i>;

        const householdCreation = (this.state.showHouseholdCreation)
            ? (
                <div className="side-bar__household-create-form-wrapper activated-form" ref={ this.createHouseholdFormWrapper }>
                    <CreateHouseholdForm handleClick={ this.handleHouseholdCreation }/>
                </div>
            )
            : null;

        if(this.props.currentHousehold) {
            return (
                <div className="side-bar__header">
                    <button className="side-bar__household-select-trigger" onClick={ this.toggleHouseholdSelection }>
                        <SubHeading light={ true } button={ true }>
                            Household&nbsp;
                            { caretIcon }
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
                    <StandardButton size="medium" onClick={ this.toggleHouseholdCreationForm }>
                        Create One!
                    </StandardButton>
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