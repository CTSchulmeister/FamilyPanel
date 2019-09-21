import React, { Component } from 'react';
import './LoginForm.scss';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
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
            let response = await fetch(`${ process.env.REACT_APP_API_URL }/api/user/login`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            });

            response = await response.json();
        } catch (err) {
            alert(`Error encountered: ${ err }`);
        }
    };

    render() {
        return (
            <form className="form" onSubmit={ this.handleSubmit }>
                <div className="form__header">
                    <h2 className="form__title">Log In</h2>
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
                        type="password"
                        name="password"
                        value={ this.state.password }
                        onChange={ this.handleChange }
                    />
                    <label className="form__label" htmlFor="password">Password</label>
                </div>
                <div className="form__submit-group">
                    <input
                        className="form__submit-button"
                        type="submit"
                        value="Log In"
                    />
                </div>
            </form>
        );
    }
}

export default LoginForm;