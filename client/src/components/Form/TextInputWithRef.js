import React from 'react';
import PropTypes from 'prop-types';

const TextInputWithRef = React.forwardRef((props, ref) => {
    const focusInput = event => {
        if(event.target.classList.contains('form__input-group')) {
            event.target.querySelector('.form__text-input').focus();
        } else if(event.target.parentElement.classList.contains('form__hint')) {
            event.target.parentElement.parentElement.querySelector('.form__text-input').focus();
        } else {
            event.target.parentElement.querySelector('.form__text-input').focus();
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
        <div className="form__input-group" onClick={ focusInput }>
            { hint }
            <input
                className="form__text-input"
                type={ props.type }
                name={ props.name }
                value={ props.value }
                onChange={ props.onChange }
                maxLength={ props.maxLength || null }
                minLength={ props.minLength || null }
                ref={ ref }
            />
            <label className="form__label" htmlFor={ props.name }>
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