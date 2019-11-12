import React from 'react';
import PropTypes from 'prop-types';

import Heading from './Heading';

const FormHeader = props => {
    return (
        <div className="form__header">
            <Heading 
                light={ false } 
                divider='colored' 
                small={ props.small || false }
            >
                { props.children }
            </Heading>
        </div>
    );
};

FormHeader.propTypes = {
    small: PropTypes.bool
};

export default FormHeader;