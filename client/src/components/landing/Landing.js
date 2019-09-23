import React, { Component } from 'react';
import './Landing.scss';

import LogInForm from '../LogInForm/LogInForm';
import RegistrationForm from '../RegistrationForm/RegistrationForm';

class Landing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formToShow: 'Registration',
            formComponent: <RegistrationForm />,
            buttonIntro: 'Already have an account?',
            buttonText: 'Log in!'
        };

        this.toggleForm.bind(this);
    }

    toggleForm = () => {
        if(this.state.formToShow === 'Registration') {
            this.setState({
                formToShow: 'Log In',
                formComponent: <LogInForm />,
                buttonIntro: 'Don\'t have an account yet?',
                buttonText: 'Register!'
            });
        } else {
            this.setState({
                formToShow: 'Registration',
                formComponent: <RegistrationForm />,
                buttonIntro: 'Already have an account?',
                buttonText: 'Log in!'
            });
        }
    };

    render() {
        return (
            <div className="landing">
                <div className="landing__main-container">
                    <main className="landing__main">
                        <h1 className="landing__title">FamilyPanel</h1>
                        <p className="landing__description">
                            FamilyPanel allows your household to easily coordinate with eachother.
                        </p>
                        <p className="landing__description">
                            Create events, assign tasks, and leaves notes for each other.
                            It's easy to keep your household organized with FamilyPanel there to help you.
                        </p>
                    </main>
                    <aside className="landing__form-container">
                        <div className="landing__form-wrapper">
                            { this.state.formComponent }
                        </div>
                        <hr className="landing__divider" />
                        <div className="landing__form-switcher">
                            { this.state.buttonIntro }
                            <button className="landing__form-switcher-button" onClick={ this.toggleForm }>
                                { this.state.buttonText }
                            </button>
                        </div>
                    </aside>
                    <div className="landing__decorative-panel">.</div>
                </div>
            </div>
        );
    }
}

export default Landing;