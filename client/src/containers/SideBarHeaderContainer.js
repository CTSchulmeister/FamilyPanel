import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    selectCurrentHousehold,
    selectHouseholds
} from '../selectors/householdSelectors';
import {
    changeCurrentHousehold
} from '../actions/householdActions';

import SideBarHeader from '../components/SideBarHeader';

class SideBarHeaderContainer extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            showHouseholdCreation: false
        };

        this.toggleHouseholdCreationForm.bind(this);
        this.handleHouseholdCreation.bind(this);
    }

    toggleHouseholdCreationForm = () => {
        this.setState({
            showHouseholdCreation: !this.state.showHouseholdCreation
        });
    };

    handleHouseholdCreation = () => {
        this.setState({
            showHouseholdCreation: false
        });
    };

    render() {
        const props = {
            toggleHouseholdCreationForm: this.toggleHouseholdCreationForm,
            handleHouseholdCreation: this.handleHouseholdCreation,
            showHouseholdCreation: this.state.showHouseholdCreation,
            currentHousehold: this.props.currentHousehold,
            households: this.props.households,
            changeCurrentHousehold: this.props.changeCurrentHousehold
        };

        return <SideBarHeader { ...props } />;
    }
}

const mapStateToProps = state => ({
    households: selectHouseholds(state),
    currentHousehold: selectCurrentHousehold(state)
});

export default connect(mapStateToProps, {
    changeCurrentHousehold
})(SideBarHeaderContainer);