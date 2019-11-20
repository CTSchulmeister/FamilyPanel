import React from 'react';
import PropTypes from 'prop-types';
import isRequiredIf from 'react-proptype-conditional-require';

import AppContainer from '../containers/AppContainer';
import SectionHeader from './SectionHeader';

const Tasks = ({
    user,
    currentHousehold,
    isAuthenticated
}) => {
    let content = null;

    if(isAuthenticated) {
        content = (
            <section className="tasks">
                <SectionHeader title="Tasks" />
            </section>
        )
    }

    return (
        <AppContainer activeLink="tasks">
            { content }
        </AppContainer>
    );
};

Tasks.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: isRequiredIf(PropTypes.object, props => props.isAuthenticated === true),
    currentHousehold: isRequiredIf(PropTypes.object, props => props.isAuthenticated === true)  
};

export default Tasks;