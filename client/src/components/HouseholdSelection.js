import React from 'react';
import PropTypes from 'prop-types';

import StandardButton from './StandardButton';
import HouseholdOption from './HouseholdOption';

const HouseholdSelection = ({
    households,
    changeCurrentHousehold,
    history
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

    return (
        <div className="household-selection">
            <StandardButton size="wide" onClick={ () => history.push('/create-household') }>
                Create Household
            </StandardButton>
            <div className="household-selection__list">
                { householdOptions }
            </div>
        </div>
    );
};

HouseholdSelection.propTypes = {
    toggleHouseholdCreationForm: PropTypes.func.isRequired,
    changeCurrentHousehold: PropTypes.func.isRequired,
    households: PropTypes.array.isRequired
};

export default HouseholdSelection;