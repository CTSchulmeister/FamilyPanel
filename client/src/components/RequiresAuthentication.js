import React from 'react';
import { Link } from 'react-router-dom';

const RequiresAuthentication = (props) => {
    return (
        <div className="req-auth__wrapper">
            <main className="req-auth">
                <h1 className="req-auth__heading">Oops...</h1>
                <p className="req-auth__sub-heading">You need to be logged in to see this page.</p>
                <Link to="/" className="button button--med">Log In</Link>
            </main>
        </div>
    );
}

export default RequiresAuthentication;

