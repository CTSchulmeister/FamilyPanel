import React from 'react';
import PropTypes from 'prop-types';

import Heading from './Heading';

import HomeSettingsGroup from './HomeSettingsGroup';
import ToggleableHomeSetting from './ToggleableHomeSetting';
import SubmitButton from './SubmitButton';
import TextInput from './TextInput';
import FormErrorBoundary from './FormErrorBoundary';
import DropDown from './DropDown';
import UserPanel from './UserPanel';

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
    const owner = currentHousehold.members.filter(member => member._id === ownerId)[0];

    const userOptions = currentHousehold.members.map(member => {
        return <UserPanel 
            user={ member } 
            key={ member._id } 
            isButton={ true } 
            isRounded={ false } 
            onClick={ () => handleUserSelect(member._id) }
        />;
    });

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
                        <HomeSettingsGroup label="Household Name">
                            <TextInput
                                type="text"
                                name="name"
                                value={ name }
                                onChange={ handleTextChange }
                                label="Household Name"
                                light={ true }
                            />
                        </HomeSettingsGroup>
                        <HomeSettingsGroup label="Owner">
                            <DropDown>
                                <UserPanel user={ owner } isDropDownTrigger={ true } isRounded={ true } />
                                { userOptions }
                            </DropDown>
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