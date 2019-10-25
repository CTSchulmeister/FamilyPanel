import React from 'react';
import PropTypes from 'prop-types';

const TextInput = props => {
    const focusInput = event => {
        if(event.target.classList.contains('form__input-group')) {
            event.target.querySelector('.form__text-input').focus();
        } else if(event.target.parentElement.classList.contains('form__hint')) {
            event.target.parentElement.parentElement.querySelector('.form__text-input').focus();
        } else {
            event.target.parentElement.querySelector('.form__text-input').focus();
        }
    }

    return (
        <div className="form__input-group" onClick={ focusInput }>
            <input
                className="form__text-input"
                type={ props.type }
                name={ props.name }
                value={ props.value }
                onChange={ props.onChange }
                maxLength={ props.maxLength || null }
                minLength={ props.minLength || null }
            />
            <label className="form__label" htmlFor={ props.name }>
                { props.label }
            </label>
        </div>
    );
};

TextInput.propTypes = {
    type: PropTypes.oneOf([
        'email',
        'text',
        'password',
        'tel',
        'url'
    ]).isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
};

export default TextInput;