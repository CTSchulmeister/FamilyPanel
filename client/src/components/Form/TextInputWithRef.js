import React from 'react';
import PropTypes from 'prop-types';

const TextInputWithRef = React.forwardRef((props, ref) => {
    const inputClassName = (props.light)
        ? 'form__text-input--light'
        : 'form__text-input--dark';

    const labelClassName = (props.light)
        ? 'form__label--light'
        : 'form__label--dark';

    const inputGroupClassName = (props.light)
        ? 'form__input-group--light'
        : 'form__input-group--dark';

    const focusInput = event => {
        if(event.target.classList.contains(`.${ inputGroupClassName }`)) {
            event.target.querySelector(`.${ inputClassName }`).focus();
        } else if(event.target.parentElement.classList.contains('form__hint')) {
            event.target.parentElement.parentElement.querySelector(`.${ inputClassName }`).focus();
        } else {
            event.target.parentElement.querySelector(`.${ inputClassName }`).focus();
        }
    }

    let hint = (props.hint)
        ? (
            <div className="form__hint">
                <i className="fas fa-info-circle"></i>
                &nbsp;
                { props.hint }
            </div>
        )
        : null;

    return (
        <div className={ inputGroupClassName } onClick={ focusInput }>
            { hint }
            <input
                className={ inputClassName }
                type={ props.type }
                name={ props.name }
                value={ props.value }
                onChange={ props.onChange }
                maxLength={ props.maxLength || null }
                minLength={ props.minLength || null }
                ref={ ref }
            />
            <label className={ labelClassName } htmlFor={ props.name }>
                { props.label }
            </label>
        </div>
    );
});

TextInputWithRef.propTypes = {
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

export default TextInputWithRef;