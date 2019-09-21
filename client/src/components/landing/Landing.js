import React from 'react';
import { connect } from 'react-redux';
import './Landing.scss';

import LoginForm from '../loginForm/LoginForm';
import RegistrationForm from '../registrationForm/RegistrationForm';

const Landing = (props) => {
    let formToShow;

    if(props.form === 'login') {
        formToShow = <LoginForm />;
    } else {
        formToShow = <RegistrationForm />;
    }

    console.log(formToShow);

    return (
        <div className="landing">
            <div className="landing__main-container">
                <main className="landing__main">
                    <h1 className="landing__title">FamilyPanel</h1>
                </main>
                <aside className="landing__form-wrapper">
                    { formToShow }
                </aside>
                <div className="landing__decorative-panel">.</div>
            </div>
        </div>
    );
};

export default Landing;