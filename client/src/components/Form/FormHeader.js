import React from 'react';
import PropTypes from 'prop-types';

const FormHeader = props => {
    return (
        <div className="form__header">
            <h2 className="form__title">{ props.text }</h2>
        </div>
    );
};

FormHeader.propTypes = {
    text: PropTypes.string.isRequired
};

export default FormHeader;