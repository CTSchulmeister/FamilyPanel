import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({
    type,
    name,
    value,
    label,
    onChange,
    hint,
    light,
    maxLength,
    minLength
}) => {
    const inputClassName = (light)
        ? 'form__text-input--light'
        : 'form__text-input--dark';

    const labelClassName = (light)
        ? 'form__label--light'
        : 'form__label--dark';

    let inputGroupClassName = (light)
        ? 'form__input-group--light'
        : 'form__input-group--dark';

    inputGroupClassName += (maxLength)
        ? ' form__input-group--max-length'
        : '';

    const focusInput = event => {
        if(event.target.classList.contains(`.${ inputGroupClassName }`)) {
            event.target.querySelector(`.${ inputClassName }`).focus();
        } else if(event.target.parentElement.classList.contains('form__hint')) {
            event.target.parentElement.parentElement.querySelector(`.${ inputClassName }`).focus();
        } else {
            event.target.parentElement.querySelector(`.${ inputClassName }`).focus();
        }
    }

    const inputHint = (hint)
        ? (
            <div className="form__hint">
                <i className="fas fa-info-circle"></i>
                &nbsp;
                { hint }
            </div>
        )
        : null;

    const inputLength = (maxLength)
        ? (
            <div className="form__input-length">
                { value.length } / { maxLength }
            </div>
        )
        : null;

    return (
        <div className={ inputGroupClassName } onClick={ focusInput }>
            { inputHint }
            <input
                className={ inputClassName }
                type={ type }
                name={ name }
                value={ value }
                onChange={ onChange }
                maxLength={ maxLength || null }
                minLength={ minLength || null }
            />
            <label className={ labelClassName } htmlFor={ name }>
                { label }
            </label>
            { inputLength }
        </div>
    );
};

TextInput.propTypes = {
    light: PropTypes.bool,
    hint: PropTypes.string,
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
    label: PropTypes.string.isRequired,
    maxLength: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    minLength: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
};

export default TextInput;