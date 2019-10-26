import React from 'react';
import PropTypes from 'prop-types';

import Heading from '../Typography/Heading';

const FormHeader = props => {
    return (
        <div className="form__header">
            <Heading 
                light={ false } 
                divider='colored' 
                small={ props.small || false }
            >
                { props.text }
            </Heading>
        </div>
    );
};

FormHeader.propTypes = {
    text: PropTypes.string.isRequired,
    small: PropTypes.bool
};

export default FormHeader;