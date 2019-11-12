import React from 'react';
import PropTypes from 'prop-types';

import FormErrorBoundary from './FormErrorBoundary';
import FormHeader from './FormHeader';
import TextInput from './TextInput';
import SubmitButton from './SubmitButton';

const formatErrors = errors => {
    let incrementedKey = 0;

    const formattedErrors = errors.map(error => {
        let param;

        switch(error.param) {
            case 'email':
                param = 'Email:';
                break;
            case 'password':
                param = 'Password:';
                break;
            default:
                param = '';
        }

        incrementedKey++;

        return (
            <li className="form__error" key={ incrementedKey }>
                <span className="form__error-param">{ param }</span> { error.msg }
            </li>
        );
    });

    return (
        <div className="form__errors">
            <span className="form__errors-header">Log In Errors:</span>
            <ul className="form__errors-list">
                { formattedErrors }
            </ul>
        </div>
    );
};

const LogInForm = ({
    handleChange,
    handleSubmit,
    logInErrors,
    email,
    password
}) => {
    const errors = logInErrors ? formatErrors(logInErrors) : null;

    return (
        <FormErrorBoundary formName="Log In">
            <form className="form" onSubmit={ handleSubmit }>
                { errors }
                <FormHeader>
                    Log In
                </FormHeader>
                <TextInput
                    type="email"
                    name="email"
                    value={ email }
                    onChange={ handleChange }
                    label="Email"
                />
                <TextInput
                    type="password"
                    name="password"
                    value={ password }
                    onChange={ handleChange }
                    label="Password"
                />
                <SubmitButton text="Log In" />
            </form>
        </FormErrorBoundary>
    );
}

LogInForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    logInErrors: PropTypes.array,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
};

export default LogInForm;