import React, { Component } from 'react';
import './RegistrationForm.scss';

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

        this.handleFirstNameChange.bind(this);
        this.handleLastNameChange.bind(this);
        this.handleEmailChange.bind(this);
        this.handleRetypeEmailChange.bind(this);
        this.handlePasswordChange.bind(this);
        this.handleRetypePasswordChange.bind(this);
        this.handleSubmit.bind(this);
    }

    handleFirstNameChange = (event) => {
        this.setState({
            firstName: event.target.value
        });
    };

    handleLastNameChange = (event) => {
        this.setState({
            lastName: event.target.value
        });
    };

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        });
    };

    handleRetypeEmailChange = (event) => {
        this.setState({
            retypeEmail: event.target.value
        });
    };

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        });
    };

    handleRetypePasswordChange = (event) => {
        this.setState({
            retypePassword: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        alert(`${ this.state.firstName } ${ this.state.lastName } ${ this.state.email } ${ this.state.password }`);
    };

    render() {
        return (
            <form className="form" onSubmit={ this.handleSubmit }>
                <div className="form__header">
                    <h2 className="form__title">Register</h2>
                </div>
                <div className="form__input-group">
                    <input 
                        className="form__text-input"
                        type="text"
                        value={ this.state.firstName }
                        onChange={ this.handleFirstNameChange }
                    />
                    <label className="form__label">First Name</label>
                </div>
                <div className="form__input-group">
                    <input 
                        className="form__text-input"
                        type="text" 
                        value={ this.state.lastName }
                        onChange={ this.handleLastNameChange }
                    />
                    <label className="form__label">Last Name</label>
                </div>
                <div className="form__input-group">
                    <input
                        className="form__text-input"
                        type="email"
                        value={ this.state.email }
                        onChange={ this.handleEmailChange }
                    />
                    <label className="form__label">Email</label>
                </div>
                <div className="form__input-group">
                    <input
                        className="form__text-input"
                        type="email"
                        value={ this.state.retypeEmail }
                        onChange={ this.handleRetypeEmailChange }
                    />
                    <label className="form__label">Retype Email</label>
                </div>
                <div className="form__input-group">
                    <input
                        className="form__text-input"
                        type="password"
                        value={ this.state.password }
                        onChange={ this.handlePasswordChange }
                    />
                    <label className="form__label">Password</label>
                </div>
                <div className="form__input-group">
                    <input
                        className="form__text-input"
                        type="password"
                        value={ this.state.retypePassword }
                        onChange={ this.handleRetypePasswordChange }
                    />
                    <label className="form__label">Retype Password</label>
                </div>
                <div className="form__submit-group">
                    <input
                        className="form__submit-button"
                        type="submit"
                        value="Register"
                    />
                </div>
            </form>
        );
    }
}

export default RegistrationForm;