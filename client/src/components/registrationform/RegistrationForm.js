import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
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

    handleSubmit = (event) => {
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
            <form className="form" onSubmit={ this.handleSubmit }>
                { errors }
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
                        className="button button--med"
                        type="submit"
                        value="Register"
                    />
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        registrationErrors: state.auth.registrationErrors
    }
}

export default connect(mapStateToProps, { registerUser })(RegistrationForm);