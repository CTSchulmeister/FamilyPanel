import React from 'react';
import PropTypes from 'prop-types';

import Heading from './Heading';

const SectionHeader = ({
    title,
    children
}) => {
    return (
        <header className="section-header">
            <Heading light={ true }>
                { title }
            </Heading>
            { children }
        </header>
    );
};

SectionHeader.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node
};

export default SectionHeader;