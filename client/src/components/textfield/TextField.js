import React from 'react';
import PropTypes from 'prop-types';
import './TextField.scss';

const TextField = (props) => {
    return (
        <div className="text-field">
            <input className="text-field__input" 
                type={ props.fieldType } 
                name={ props.fieldName }
                placeholder={ props.labelName }
            />
        </div>
    );
};

TextField.propTypes = {
    fieldType: PropTypes.oneOf([
        'text',
        'password',
        'email'
    ]).isRequired,

    fieldName: PropTypes.string.isRequired,

    labelName: PropTypes.string.isRequired
}

export default TextField;