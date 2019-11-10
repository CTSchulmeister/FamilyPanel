import React from 'react';
import PropTypes from 'prop-types';

import StandardButton from '../Buttons/StandardButton';
import HouseholdOption from './HouseholdOption';

import CreateHousehold from '../../containers/CreateHousehold';

const HouseholdSelection = ({
    households,
    toggleHouseholdCreationForm,
    changeCurrentHousehold,
    showHouseholdCreation,
    handleHouseholdCreation
}) => {
    const householdOptions = households.map(household => {
        return (
            <HouseholdOption
                key={ household._id }
                id={ household._id }
                name={ household.name }
                changeCurrentHousehold={ changeCurrentHousehold }
            />
        );
    });

    const householdCreation = (showHouseholdCreation)
        ? (
            <CreateHousehold
                toggleHouseholdCreationForm={ toggleHouseholdCreationForm }
                handleHouseholdCreation={ handleHouseholdCreation }
                className="fromSelection"
            />
        ) 
        : null;

    return (
        <div className="household-selection">
            <StandardButton size="wide" onClick={ toggleHouseholdCreationForm }>
                Create Household
            </StandardButton>
            <div className="household-selection__list">
                { householdOptions }
            </div>
            { householdCreation }
        </div>
    );
};

HouseholdSelection.propTypes = {
    toggleHouseholdCreationForm: PropTypes.func.isRequired,
    changeCurrentHousehold: PropTypes.func.isRequired,
    households: PropTypes.array.isRequired
};

export default HouseholdSelection;