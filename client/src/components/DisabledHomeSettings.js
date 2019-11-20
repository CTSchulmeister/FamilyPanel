import React from 'react';
import PropTypes from 'prop-types';

import Heading from './Heading';
import HomeSettingsGroup from './HomeSettingsGroup';
import ToggleableHomeSetting from './ToggleableHomeSetting';
import Paragraph from './Paragraph';
import UserPanel from './UserPanel';

const DisabledHomeSettings = ({
    currentHousehold
}) => {
    const {
        allMembersCanCreateEvents,
        allMembersCanCreateNotes,
        allMembersCanCreateTasks,
        allMembersCanInvite
    } = currentHousehold.settings;

    const owner = currentHousehold.members.filter(member => {
        return member._id === currentHousehold._ownerId;
    })[0];

    return (
        <div className="home-settings">
            <div className="home-settings__header">
                <Heading light={ true } divider="dark">
                    Settings
                </Heading>
            </div>
            <div className="home-settings__list">
                <HomeSettingsGroup label="Note:">
                    <Paragraph light={ true }>
                        Only the household's owner can change the settings.
                    </Paragraph>
                </HomeSettingsGroup>
                <HomeSettingsGroup label="Member Permissions">
                    <ToggleableHomeSetting
                        label="Allow all members to invite: "
                        isOn={ allMembersCanInvite }
                        disabled={ true }
                        light={ true }
                    />
                    <ToggleableHomeSetting
                        label="Allow all members to create events: "
                        isOn={ allMembersCanCreateEvents }
                        disabled={ true }
                        light={ true }
                    />
                    <ToggleableHomeSetting
                        label="Allow all members to create tasks: "
                        isOn={ allMembersCanCreateTasks }
                        disabled={ true }
                        light={ true }
                    />
                    <ToggleableHomeSetting
                        label="Allow all members to create notes: "
                        isOn={ allMembersCanCreateNotes }
                        disabled={ true }
                        light={ true }
                    />
                </HomeSettingsGroup>
                <HomeSettingsGroup label="Household Owner">
                    <UserPanel user={ owner } isRounded={ true } />
                </HomeSettingsGroup>
            </div>
        </div>
    )
}

DisabledHomeSettings.propTypes = {
    currentHousehold: PropTypes.object.isRequired
};

export default DisabledHomeSettings;