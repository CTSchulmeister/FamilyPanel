import React from 'react';
import PropTypes from 'prop-types';

import Heading from '../Typography/Heading';

import HomeSettingsGroup from './HomeSettingsGroup';
import ToggleableHomeSetting from './ToggleableHomeSetting';
import SubmitButton from '../Form/SubmitButton';
import TextInput from '../Form/TextInput';
import UserSelect from '../Form/UserSelect';
import FormErrorBoundary from '../Form/FormErrorBoundary';

const HomeSettings = ({
    handleSubmit,
    handleToggleChange,
    handleTextChange,
    handleUserSelect,
    currentHousehold,
    allMembersCanCreateEvents,
    allMembersCanCreateNotes,
    allMembersCanCreateTasks,
    allMembersCanInvite,
    name,
    ownerId
}) => {
    return (
        <div className="home-settings">
            <div className="home-settings__header">
                <Heading light={ true } divider="dark">
                    Settings
                </Heading>
            </div>
            <div className="home-settings__list">
                <FormErrorBoundary formName="Home Settings">
                    <form onSubmit={ handleSubmit }>
                        <HomeSettingsGroup label="Member Permissions">
                            <ToggleableHomeSetting
                                label={ 'Allow all members to invite: '}
                                onClick={ () => handleToggleChange('allMembersCanInvite') }
                                isOn={ allMembersCanInvite }
                            />
                            <ToggleableHomeSetting
                                label={ 'Allow all members to create events: '}
                                onClick={ () => handleToggleChange('allMembersCanCreateEvents') }
                                isOn={ allMembersCanCreateEvents }
                            />
                            <ToggleableHomeSetting
                                label={ 'Allow all members to create tasks: '}
                                onClick={ () => handleToggleChange('allMembersCanCreateTasks') }
                                isOn={ allMembersCanCreateTasks }
                            />
                            <ToggleableHomeSetting
                                label={ 'Allow all members to create notes: '}
                                onClick={ () => handleToggleChange('allMembersCanCreateNotes') }
                                isOn={ allMembersCanCreateNotes }
                            />
                        </HomeSettingsGroup>
                        <HomeSettingsGroup label="Change...">
                            <TextInput
                                type="text"
                                name="name"
                                value={ name }
                                onChange={ handleTextChange }
                                label="Household Name"
                                light={ true }
                            />
                            <UserSelect
                                users={ currentHousehold.members }
                                activeUserId={ ownerId }
                                title="Change Owner"
                                onClick={ handleUserSelect }
                            />
                        </HomeSettingsGroup>
                        <SubmitButton text="Save" />
                    </form>
                </FormErrorBoundary>
                
            </div>
        </div>
    );
};

HomeSettings.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleToggleChange: PropTypes.func.isRequired,
    handleTextChange: PropTypes.func.isRequired,
    handleUserSelect: PropTypes.func.isRequired,
    currentHousehold: PropTypes.object.isRequired,
    allMembersCanCreateEvents: PropTypes.bool.isRequired,
    allMembersCanCreateNotes: PropTypes.bool.isRequired,
    allMembersCanCreateTasks: PropTypes.bool.isRequired,
    allMembersCanInvite: PropTypes.bool.isRequired
};

export default HomeSettings;