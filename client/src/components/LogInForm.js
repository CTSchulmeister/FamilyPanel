import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectLogInErrors } from '../reducers/selectors';
import { logUserIn } from '../actions/userActions';

import FormErrorBoundary from './Form/FormErrorBoundary';
import FormHeader from './Form/FormHeader';
import TextInput from './Form/TextInput';
import SubmitButton from './Form/SubmitButton';

class LogInForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
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
            this.props.logUserIn(this.state);
        } catch (err) {
            alert(`Error encountered: ${ err }`);
        }
    };

    render() {
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
                        value={ this.state.email }
                        onChange={ this.handleChange }
                        label="Email"
                    />
                    <TextInput
                        type="password"
                        name="password"
                        value={ this.state.password }
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
        logInErrors: selectLogInErrors(state)
    };
}

export default connect(mapStateToProps, { logUserIn })(LogInForm);