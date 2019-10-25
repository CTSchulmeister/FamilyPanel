import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { registerUser } from '../actions/userActions';

import FormHeader from './Form/FormHeader';
import TextInput from './Form/TextInput';
import SubmitButton from './Form/SubmitButton';
import FormErrorBoundary from './Form/FormErrorBoundary';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            registrationData: {
                firstName: '',
                lastName: '',
                email: '',
                retypeEmail: '',
                password: '',
                retypePassword: ''
            }
        };

        this.handleChange.bind(this);
        this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        let key = event.target.name;
        let value = event.target.value;

        this.setState({
            registrationData: {
                ...this.state.registrationData,
                [key]: value
            }
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        try {
            this.props.registerUser(this.state.registrationData);
        } catch (err) {
            alert(`Error encountered: ${ err }`);
        }
    };

    render() {
        if(this.props.isAuthenticated) {
            return (
                <Redirect to="/profile" />
            );
        }

        let errors = null;
        if(this.props.registrationErrors) {
            let errorsArray = this.props.registrationErrors;
            errors = errorsArray.map(error => {
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

                return (
                    <li className="form__error">
                        <span className="form__error-param">{ param }</span> - { error.msg }
                    </li>
                );
            });

            errors = 
                <div className="form__errors">
                    <span className="form__errors-header">Registration Errors:</span>
                    <ul className="form__errors-list">
                        { errors }
                    </ul>
                </div>;
        }

        return (
            <FormErrorBoundary formName="Registration">
                <form className="form" onSubmit={ this.handleSubmit }>
                    { errors }
                    <FormHeader text="Register" />
                    <TextInput
                        type="text"
                        name="firstName"
                        value={ this.state.registrationData.firstName }
                        onChange={ this.handleChange }
                        label="First Name"
                        maxLength={ 30 }
                    />
                    <TextInput
                        type="text"
                        name="lastName"
                        value={ this.state.registrationData.lastName }
                        onChange={ this.handleChange }
                        label="Last Name"
                        maxLength={ 30 }
                    />
                    <TextInput
                        type="email"
                        name="email"
                        value={ this.state.registrationData.email }
                        onChange={ this.handleChange }
                        label="Email"
                    />
                    <TextInput
                        type="email"
                        name="retypeEmail"
                        value={ this.state.registrationData.retypeEmail }
                        onChange={ this.handleChange }
                        label="Retype Email"
                    />
                    <TextInput
                        hint="A valid password must contain at least 8 characters, including letters, numbers, and special characters"
                        type="password"
                        name="password"
                        value={ this.state.registrationData.password }
                        onChange={ this.handleChange }
                        label="Password"
                    />
                    <TextInput
                        type="password"
                        name="retypePassword"
                        value={ this.state.registrationData.retypePassword }
                        onChange={ this.handleChange }
                        label="Retype Password"
                    />
                    <SubmitButton text="Register" />
                </form>
            </FormErrorBoundary>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.user.authenticated,
        registrationErrors: state.user.registrationErrors
    }
}

export default connect(mapStateToProps, { registerUser })(RegistrationForm);