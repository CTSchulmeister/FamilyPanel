import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectRegistrationErrors } from '../reducers/selectors';
import { registerUser } from '../actions/userActions';

import FormHeader from './Form/FormHeader';
import TextInput from './Form/TextInput';
import SubmitButton from './Form/SubmitButton';
import FormErrorBoundary from './Form/FormErrorBoundary';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            retypeEmail: '',
            password: '',
            retypePassword: ''
        };

        this.handleChange.bind(this);
        this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        let key = event.target.name;
        let value = event.target.value;

        this.setState({
            [key]: value
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        try {
            this.props.registerUser(this.state);
        } catch (err) {
            alert(`Error encountered: ${ err }`);
        }
    };

    render() {
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
                        value={ this.state.firstName }
                        onChange={ this.handleChange }
                        label="First Name"
                        maxLength={ 30 }
                    />
                    <TextInput
                        type="text"
                        name="lastName"
                        value={ this.state.lastName }
                        onChange={ this.handleChange }
                        label="Last Name"
                        maxLength={ 30 }
                    />
                    <TextInput
                        type="email"
                        name="email"
                        value={ this.state.email }
                        onChange={ this.handleChange }
                        label="Email"
                    />
                    <TextInput
                        type="email"
                        name="retypeEmail"
                        value={ this.state.retypeEmail }
                        onChange={ this.handleChange }
                        label="Retype Email"
                    />
                    <TextInput
                        hint="A valid password must contain at least 8 characters, including letters, numbers, and special characters"
                        type="password"
                        name="password"
                        value={ this.state.password }
                        onChange={ this.handleChange }
                        label="Password"
                    />
                    <TextInput
                        type="password"
                        name="retypePassword"
                        value={ this.state.retypePassword }
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
        registrationErrors: selectRegistrationErrors(state)
    }
}

export default connect(mapStateToProps, { registerUser })(RegistrationForm);