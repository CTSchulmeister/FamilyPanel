import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeHouseholdSettings } from '../../actions/householdActions';
import { selectCurrentHousehold } from '../../reducers/selectors';

import Heading from '../Typography/Heading';

import HomeSettingsGroup from './HomeSettingsGroup';
import ToggleableHomeSetting from './ToggleableHomeSetting';
import SubmitButton from '../Form/SubmitButton';
import TextInput from '../Form/TextInput';
import UserSelect from '../Form/UserSelect';
import FormErrorBoundary from '../Form/FormErrorBoundary';

class HomeSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            householdId: props.currentHousehold._id,
            allMembersCanInvite: props.currentHousehold.settings.allMembersCanInvite,
            allMembersCanCreateEvents: props.currentHousehold.settings.allMembersCanCreateEvents,
            allMembersCanCreateTasks: props.currentHousehold.settings.allMembersCanCreateTasks,
            allMembersCanCreateNotes: props.currentHousehold.settings.allMembersCanCreateNotes,
            name: props.currentHousehold.name,
            ownerId: props.currentHousehold._ownerId
        };

        this.handleToggleChange.bind(this);
        this.handleSubmit.bind(this);
    }
    
    handleToggleChange = key => {
        this.setState({
            [key]: this.state[key] ? false : true
        });
    };

    handleTextChange = event => {
        const key = event.target.name;
        const value = event.target.value;

        this.setState({
            [key]: value
        });
    };

    handleUserSelect = userId => {
        this.setState({
            ownerId: userId
        });
    };
    
    handleSubmit = event => {
        event.preventDefault();

        try {
            this.props.changeHouseholdSettings(this.state);
        } catch (err) {
            alert(`Error encountered: ${ err }`);
        }
    };

    render() {
        return (
            <div className="home-settings">
                <div className="home-settings__header">
                    <Heading light={ true } divider="dark">
                        Settings
                    </Heading>
                </div>
                <div className="home-settings__list">
                    <FormErrorBoundary formName="Home Settings">
                        <form onSubmit={ this.handleSubmit }>
                            <HomeSettingsGroup label="Member Permissions">
                                <ToggleableHomeSetting
                                    label={ 'Allow all members to invite: '}
                                    onClick={ () => this.handleToggleChange('allMembersCanInvite') }
                                    isOn={ this.props.currentHousehold.settings.allMembersCanInvite }
                                />
                                <ToggleableHomeSetting
                                    label={ 'Allow all members to create events: '}
                                    onClick={ () => this.handleToggleChange('allMembersCanCreateEvents') }
                                    isOn={ this.props.currentHousehold.settings.allMembersCanCreateEvents }
                                />
                                <ToggleableHomeSetting
                                    label={ 'Allow all members to create tasks: '}
                                    onClick={ () => this.handleToggleChange('allMembersCanCreateTasks') }
                                    isOn={ this.props.currentHousehold.settings.allMembersCanCreateTasks }
                                />
                                <ToggleableHomeSetting
                                    label={ 'Allow all members to create notes: '}
                                    onClick={ () => this.handleToggleChange('allMembersCanCreateNotes') }
                                    isOn={ this.props.currentHousehold.settings.allMembersCanCreateNotes }
                                />
                            </HomeSettingsGroup>
                            <HomeSettingsGroup label="Change...">
                                <TextInput
                                    type="text"
                                    name="name"
                                    value={ this.state.name }
                                    onChange={ this.handleTextChange }
                                    label="Household Name"
                                    light={ true }
                                />
                                <UserSelect
                                    users={ this.props.currentHousehold.members }
                                    activeUserId={ this.state.ownerId }
                                    title="Change Owner"
                                    onClick={ this.handleUserSelect }
                                />
                            </HomeSettingsGroup>
                            <SubmitButton text="Save" />
                        </form>
                    </FormErrorBoundary>
                    
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentHousehold: selectCurrentHousehold(state)
    };
}

export default connect(mapStateToProps, { changeHouseholdSettings })(HomeSettings);