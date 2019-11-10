import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeHouseholdSettings } from '../actions/householdActions';
import { selectCurrentHousehold } from '../selectors/householdSelectors';

import HomeSettings from '../components/Home/HomeSettings';

class HomeSettingsContainer extends Component {
    constructor(props) {
        super(props);

        const {
            _id,
            settings,
            name,
            _ownerId
        } = props.currentHousehold;

        this.state = {
            householdId: _id,
            allMembersCanInvite: settings.allMembersCanInvite,
            allMembersCanCreateEvents: settings.allMembersCanCreateEvents,
            allMembersCanCreateTasks: settings.allMembersCanCreateTasks,
            allMembersCanCreateNotes: settings.allMembersCanCreateNotes,
            name: name,
            ownerId: _ownerId
        };

        this.handleToggleChange.bind(this);
        this.handleTextChange.bind(this);
        this.handleUserSelect.bind(this);
        this.handleSubmit.bind(this);
    }

    handleToggleChange = key => {
        this.setState({
            [key]: !this.state[key]
        });
    };

    handleTextChange = event => {
        const {
            name: key,
            value
        } = event.target;

        this.setState({
            [key]: value
        });
    };

    handleUserSelect = userId => {
        this.setState({
            ownerId: userId
        });
    };

    handleSubmit = async event => {
        event.preventDefault();

        try {
            await this.props.changeHouseholdSettings(this.state);
        } catch (error) {
            // TODO: Handle errors with logging
            alert(`Error encountered changing household settings: ${ error }`);
        }
    };

    render() {
        const props = {
            handleToggleChange: this.handleToggleChange,
            handleTextChange: this.handleTextChange,
            handleUserSelect: this.handleUserSelect,
            handleSubmit: this.handleSubmit,
            currentHousehold: this.props.currentHousehold,
            ...this.state   
        };

        return <HomeSettings {...props} />;
    }
}

const mapStateToProps = state => ({
    currentHousehold: selectCurrentHousehold(state)
});

export default connect(mapStateToProps, { 
    changeHouseholdSettings
})(HomeSettingsContainer);