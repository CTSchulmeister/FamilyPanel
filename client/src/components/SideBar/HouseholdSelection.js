import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import StandardButton from '../Buttons/StandardButton';

import HouseholdOption from './HouseholdOption';

const HouseholdSelection = props => {
    let householdOptions = [];

    props.households.forEach(household => {
        householdOptions.push(
            <HouseholdOption
                key={ household._id }
                id={ household._id }
                name={ household.name }
                closeWindow={ props.handleHouseholdSelection }
                isOwned={ household._ownerId === props.userId }
            />
        );
    });

    return (
        <div className="household-selection">
            <StandardButton size="wide" onClick={ props.toggleHouseholdCreationForm }>
                Create Household
            </StandardButton>
            <div className="household-selection__list">
                { householdOptions }
            </div>
        </div>
    );
};

HouseholdSelection.propTypes = {
    handleHouseholdSelection: PropTypes.func.isRequired,
    toggleHouseholdCreationForm: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        userId: state.user.user._id,
        households: state.households.households
    };
}

export default connect(mapStateToProps)(HouseholdSelection);