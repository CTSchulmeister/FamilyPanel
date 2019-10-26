import React from 'react';
import { Link } from 'react-router-dom';

import StandardButton from './Buttons/StandardButton';

const RequiresAuthentication = (props) => {
    return (
        <div className="req-auth__wrapper">
            <main className="req-auth">
                <h1 className="req-auth__heading">Oops...</h1>
                <p className="req-auth__sub-heading">You need to be logged in to see this page.</p>
                <Link to="/">
                    <StandardButton size="medium">
                        Log In!
                    </StandardButton>
                </Link>
            </main>
        </div>
    );
}

export default RequiresAuthentication;

