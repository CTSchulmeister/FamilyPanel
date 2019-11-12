import React from 'react';
import PropTypes from 'prop-types';

import DropDown from './DropDown';

import HouseholdSelection from './HouseholdSelection';
import CreateHouseholdFormContainer from '../containers/CreateHouseholdFormContainer';

import Heading from './Heading';
import SubHeading from './SubHeading';
import Divider from './Divider';
import StandardButton from './StandardButton';

const SideBarHeader = ({
    toggleHouseholdCreationForm,
    handleHouseholdCreation,
    showHouseholdCreation,
    changeCurrentHousehold,
    currentHousehold,
    households
}) => {
    if(currentHousehold) {
        return (
            <div className="side-bar__header">
                
                <DropDown>
                    <SubHeading light={ true } button={ true }>
                        Household&nbsp;
                        <i className="fas fa-caret-down"></i>
                    </SubHeading>
                    <HouseholdSelection
                        households={ households }
                        toggleHouseholdCreationForm={ toggleHouseholdCreationForm }
                        changeCurrentHousehold={ changeCurrentHousehold }
                        showHouseholdCreation={ showHouseholdCreation }
                        handleHouseholdCreation={ handleHouseholdCreation }
                    />
                </DropDown>
                <Heading light={ true } divider='light'>
                    { currentHousehold.name }
                </Heading>
            </div>
        );
    } else {
        const householdCreationForm = (showHouseholdCreation)
            ? (
                <CreateHouseholdFormContainer
                    toggleHouseholdCreationForm={ toggleHouseholdCreationForm }
                    handleHouseholdCreation={ handleHouseholdCreation }
                />
            )
            : null;

        return (
            <div className="side-bar__header">
                <SubHeading light={ true }>
                    You have no households...
                </SubHeading>
                <br />
                <StandardButton size="medium" onClick={ toggleHouseholdCreationForm }>
                    Create One!
                </StandardButton>
                <br />
                { householdCreationForm }
                <Divider color="light" size="large" />
            </div>
        );
    }
};

SideBarHeader.propTypes = {
    toggleHouseholdCreationForm: PropTypes.func.isRequired,
    handleHouseholdCreation: PropTypes.func.isRequired,
    showHouseholdCreation: PropTypes.bool.isRequired,
    changeCurrentHousehold: PropTypes.func.isRequired,
    currentHousehold: PropTypes.object.isRequired
};

export default SideBarHeader;