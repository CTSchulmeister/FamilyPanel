import React from 'react';
import PropTypes from 'prop-types';

import Heading from '../Typography/Heading';

const SectionHeader = (props) => {
    return (
        <header className="section-header">
            <Heading light={ true }>
                { props.title }
            </Heading>
        </header>
    );
};

SectionHeader.propTypes = {
    title: PropTypes.string.isRequired
};

export default SectionHeader;