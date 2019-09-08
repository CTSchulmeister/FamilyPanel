import React, { Component } from 'react';

import Form from '../form/Form';
import TextField from '../textfield/TextField';

import config from '../../config';

import './LoginForm.scss';

class LoginForm extends Component {
    render() {
        return (
            <div className="login-form__container">
                <Form
                    action={ config.loginURL }
                    formName="Log In"
                >
                    <TextField fieldType="email" fieldName="email" labelName="Email" />
                    <TextField fieldType="password" fieldName="password" labelName="Password" />
                </Form>
            </div>
        );
    }
}

export default LoginForm;