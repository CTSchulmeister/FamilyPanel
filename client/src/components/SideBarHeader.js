import React from 'react';
import PropTypes from 'prop-types';
import isRequiredIf from 'react-proptype-conditional-require';

import DropDown from './DropDown';

import HouseholdSelection from './HouseholdSelection';
import Heading from './Heading';
import SubHeading from './SubHeading';
import Divider from './Divider';
import StandardButton from './StandardButton';

const SideBarHeader = ({
    changeCurrentHousehold,
    currentHousehold,
    households,
    history
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
                        changeCurrentHousehold={ changeCurrentHousehold }
                        history={ history }
                    />
                </DropDown>
                <Heading light={ true } divider='light'>
                    { currentHousehold.name }
                </Heading>
            </div>
        );
    } else {
        return (
            <div className="side-bar__header">
                <SubHeading light={ true }>
                    You have no households...
                </SubHeading>
                <br />
                <StandardButton size="medium" onClick={ () => history.push('/create-household')}>
                    Create One!
                </StandardButton>
                <br />
                <Divider color="light" size="large" />
            </div>
        );
    }
};

SideBarHeader.propTypes = {
    changeCurrentHousehold: PropTypes.func.isRequired,
    households: PropTypes.array.isRequired,
    currentHousehold: isRequiredIf(PropTypes.object, props => props.households.length > 0)
};

export default SideBarHeader;