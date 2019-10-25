import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logUserIn } from '../actions/userActions';

import FormErrorBoundary from './Form/FormErrorBoundary';
import FormHeader from './Form/FormHeader';
import TextInput from './Form/TextInput';
import SubmitButton from './Form/SubmitButton';

class LogInForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            loginData: {
                email: '',
                password: ''
            }
        };

        this.handleChange.bind(this);
        this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        let key = event.target.name;
        let value = event.target.value;

        this.setState({
            loginData: {
                ...this.state.loginData,
                [key]: value
            }
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        try {
            this.props.logUserIn(this.state.loginData);
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
        if(this.props.logInErrors) {
            let errorsArray = this.props.logInErrors;

            errors = errorsArray.map(error => {
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

                return (
                    <li className="form__error">
                        <span className="form__error-param">{ param }</span> { error.msg }
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
            <FormErrorBoundary formName="Log In">
                <form className="form" onSubmit={ this.handleSubmit }>
                    { errors }
                    <FormHeader text="Log In" />
                    <TextInput
                        type="email"
                        name="email"
                        value={ this.state.loginData.email }
                        onChange={ this.handleChange }
                        label="Email"
                    />
                    <TextInput
                        type="password"
                        name="password"
                        value={ this.state.loginData.password }
                        onChange={ this.handleChange }
                        label="Password"
                    />
                    <SubmitButton text="Log In" />
                </form>
            </FormErrorBoundary>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.user.authenticated,
        logInErrors: state.user.logInErrors
    };
}

export default connect(mapStateToProps, { logUserIn })(LogInForm);