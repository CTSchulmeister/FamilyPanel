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

        this.focusInput.bind(this);
        this.handleChange.bind(this);
        this.handleSubmit.bind(this);
    }

    focusInput = (event) => {
        if(event.target.classList.contains('form__input-group')) {
            event.target.querySelector('.form__text-input').focus();
        } else if(event.target.parentElement.classList.contains('form__hint')) {
            event.target.parentElement.parentElement.querySelector('.form__text-input').focus();
        } else {
            event.target.parentElement.querySelector('.form__text-input').focus();
        }
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
            let response = await fetch(`${ process.env.REACT_APP_API_URL }/api/user`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            });

            response = await response.json();

            console.log(response.user.firstName);
        } catch (err) {
            alert(`Error encountered: ${ err }`);
        }
    };

    render() {
        return (
            <form className="form" onSubmit={ this.handleSubmit }>
                <div className="form__header">
                    <h2 className="form__title">Register</h2>
                </div>
                <div className="form__input-group" onClick={ this.focusInput }>
                    <input 
                        className="form__text-input"
                        type="text"
                        name="firstName"
                        value={ this.state.firstName }
                        onChange={ this.handleChange }
                        maxLength="30"
                    />
                    <label className="form__label" htmlFor="firstName">First Name</label>
                </div>
                <div className="form__input-group" onClick={ this.focusInput }>
                    <input 
                        className="form__text-input"
                        type="text" 
                        name="lastName"
                        value={ this.state.lastName }
                        onChange={ this.handleChange }
                        maxLength="30"
                    />
                    <label className="form__label" htmlFor="lastName">Last Name</label>
                </div>
                <div className="form__input-group" onClick={ this.focusInput }>
                    <input
                        className="form__text-input"
                        type="email"
                        name="email"
                        value={ this.state.email }
                        onChange={ this.handleChange }
                    />
                    <label className="form__label" htmlFor="email">Email</label>
                </div>
                <div className="form__input-group" onClick={ this.focusInput }>
                    <input
                        className="form__text-input"
                        type="email"
                        name="retypeEmail"
                        value={ this.state.retypeEmail }
                        onChange={ this.handleChange }
                    />
                    <label className="form__label" htmlFor="retypeEmail">Retype Email</label>
                </div>
                <div className="form__input-group" onClick={ this.focusInput }>
                    <div className="form__hint">
                        <i className="fas fa-info-circle"></i>
                        &nbsp;
                        A valid password must contain at least 8 characters, including
                        letters, numbers, and special characters
                    </div>
                    <input
                        className="form__text-input"
                        type="password"
                        name="password"
                        value={ this.state.password }
                        onChange={ this.handleChange }
                    />
                    <label className="form__label" htmlFor="password">Password</label>
                </div>
                <div className="form__input-group" onClick={ this.focusInput }>
                    <input
                        className="form__text-input"
                        type="password"
                        name="retypePassword"
                        value={ this.state.retypePassword }
                        onChange={ this.handleChange }
                    />
                    <label className="form__label" htmlFor="retypePassword">Retype Password</label>
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