import React, { Component } from 'react';

import Form from '../form/Form';
import TextField from '../textfield/TextField';
import Hint from '../hint/Hint';

import config from '../../config';

import './RegistrationForm.scss';

class RegistrationForm extends Component {
    render() {
        return (
            <div className="registration-form__container">
                <Form
                    action={ config.registrationURL }
                    formName="Registration"
                >
                    <TextField fieldType="text" fieldName="firstName" labelName="First Name" />
                    <TextField fieldType="text" fieldName="lastName" labelName="Last Name" />
                    <TextField fieldType="email" fieldName="email" labelName="Email" />
                    <TextField fieldType="email" fieldName="retypeEmail" labelName="Retype Email" />
                    <Hint hint="Your password must be at least 8 characters long and contain letters, numbers, and special characters" />
                    <TextField fieldType="password" fieldName="password" labelName="Password" />
                    <TextField fieldType="password" fieldName="retypePassword" labelName="Retype Password" />
                </Form>
            </div>
        );
    }
}

export default RegistrationForm;