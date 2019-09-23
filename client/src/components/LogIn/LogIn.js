import React from 'react';
import './LogIn.scss';

import LogInForm from '../LogInForm/LogInForm';

const LogIn = (props) => {
    return (
        <div className="log-in">
            <main className="log-in__form-wrapper">
                <LogInForm />
            </main>
        </div>
    )
};

export default LogIn;