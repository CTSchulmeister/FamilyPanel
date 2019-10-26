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

    const handleChange = event => {
        if(event.target.value !== '') {
            let label = event.target.parentElement.querySelector('.form__label--text-area');
            label.classList.add('form__label--text-area--not-empty');
        } else {
            let label = event.target.parentElement.querySelector=('.form__label--text-area');
            label.classList.remove('form__label--text-area--not-empty');
        }

        props.onChange(event); 
    }

    return (
        <div className="form__input-group form__input-group--text-area" onClick={ focusTextArea }>
            <textarea
                className="form__text-area"
                name={ props.name }
                onChange={ handleChange }
                value={ props.value }
            />
            <label className="form__label--text-area" htmlFor={ props.name }>
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