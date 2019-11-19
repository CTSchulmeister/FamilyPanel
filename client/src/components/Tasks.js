import React from 'react';
import PropTypes from 'prop-types';

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
    user: PropTypes.object.isRequired,
    currentHousehold: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

export default Tasks;