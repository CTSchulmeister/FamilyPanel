import React from 'react';
import PropTypes from 'prop-types';

const HouseholdOption = ({
    id,
    name,
    changeCurrentHousehold
}) => {
    return (
        <button className="side-bar__household-option" onClick={
            () => changeCurrentHousehold(id)
        }>
            { name }
        </button>
    );
};

HouseholdOption.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    changeCurrentHousehold: PropTypes.func.isRequired
};

export default HouseholdOption;