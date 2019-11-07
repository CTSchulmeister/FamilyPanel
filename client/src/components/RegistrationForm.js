import React from 'react';
import PropTypes from 'prop-types';

import FormErrorBoundary from './Form/FormErrorBoundary';
import FormHeader from './Form/FormHeader';
import TextInput from './Form/TextInput';
import SubmitButton from './Form/SubmitButton';

const formatErrors = errors => {
    let incrementedKey = 0;

    const formattedErrors = errors.map(error => {
        let param;

        switch(error.param) {
            case 'firstName':
                param = 'First Name';
                break;
            case 'lastName':
                param = 'Last Name';
                break;
            case 'email':
                param = 'Email';
                break;
            case 'retypeEmail':
                param = 'Retype Email';
                break;
            case 'password':
                param = 'Password';
                break;
            case 'retypePassword':
                param = 'Retype Password';
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

const RegistrationForm = ({
    handleChange,
    handleSubmit,
    registrationErrors,
    firstName,
    lastName,
    email,
    retypeEmail,
    password,
    retypePassword
}) => {
    const errors = registrationErrors ? formatErrors(registrationErrors) : null;

    return (
        <FormErrorBoundary formName="Register">
            <form className="form" onSubmit={ handleSubmit }>
                { errors }
                <FormHeader>
                    Register
                </FormHeader>
                <TextInput
                    type="text"
                    name="firstName"
                    value={ firstName }
                    onChange={ handleChange }
                    label="First Name"
                    maxLength={ 30 }
                />
                <TextInput
                    type="text"
                    name="lastName"
                    value={ lastName }
                    onChange={ handleChange }
                    label="Last Name"
                    maxLength={ 30 }
                />
                <TextInput
                    type="email"
                    name="email"
                    value={ email }
                    onChange={ handleChange }
                    label="Email"
                />  
                <TextInput
                    type="email"
                    name="retypeEmail"
                    value={ retypeEmail }
                    onChange={ handleChange }
                    label="Retype Email"
                />
                <TextInput
                    hint="A valid password must contain at least 8 characters, including letters, numbers, and special characters"
                    type="password"
                    name="password"
                    value={ password }
                    onChange={ handleChange }
                    label="Password"
                />
                <TextInput
                    type="password"
                    name="retypePassword"
                    value={ retypePassword }
                    onChange={ handleChange }
                    label="Retype Password"
                />
                <SubmitButton text="Register" />
            </form>
        </FormErrorBoundary>
    );
}

RegistrationForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    registrationErrors: PropTypes.array,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    retypeEmail: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    retypePassword: PropTypes.string.isRequired
};

export default RegistrationForm;