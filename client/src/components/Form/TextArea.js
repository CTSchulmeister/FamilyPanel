import React from 'react';
import PropTypes from 'prop-types';

const TextArea = props => {
    const focusTextArea = event => {
        if(event.target.classList.contains('form__input-group')) {
            event.target.querySelector('.form__text-area').focus();
        } else {
            event.target.parentElement.querySelector('.form__text-area').focus();
        }
    };

    const labelClass = (props.value === '')
        ? 'form__label--text-area'
        : 'form__label--text-area form__label--text-area--not-empty';

    return (
        <div className="form__input-group form__input-group--text-area" onClick={ focusTextArea }>
            <textarea
                className="form__text-area"
                name={ props.name }
                value={ props.value }
                onChange={ props.onChange }
            />
            <label className={ labelClass } htmlFor={ props.name }>
                { props.label }
            </label>
        </div>    
    );
};

TextArea.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};

export default TextArea;