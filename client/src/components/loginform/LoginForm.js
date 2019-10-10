import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logUserIn } from '../../actions/authActions';
import './LogInForm.scss';

class LogInForm extends Component {
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
            this.props.logUserIn(this.state);
        } catch (err) {
            alert(`Error encountered: ${ err }`);
        }
    };

    render() {
        let errors = null;
        if(this.props.loginErrors) {
            let errorsArray = this.props.loginErrors;

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
            <form className="form" onSubmit={ this.handleSubmit }>
                { errors }
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
                        className="button button--med"
                        type="submit"
                        value="Log In"
                    />
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loginErrors: state.auth.loginErrors
    }
}

export default connect(mapStateToProps, { logUserIn })(LogInForm);