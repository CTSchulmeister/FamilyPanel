import React from 'react';
import { Link } from 'react-router-dom';

import Heading from './Heading';
import Paragraph from './Paragraph';
import StandardButton from './StandardButton';

const RequiresAuthentication = () => {
    return (
        <div className="req-auth__wrapper">
            <main className="req-auth">
                <Heading
                    light={ false }
                    divider="colored"
                >
                    Oops...
                </Heading>
                <Paragraph>
                    You need to be logged in to see this page.
                </Paragraph>
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

