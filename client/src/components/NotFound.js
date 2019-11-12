import React from 'react';

import Heading from './Heading';
import Paragraph from './Paragraph';
import StandardButton from './StandardButton';

const NotFound = ({
    history
}) => {
    return (
        <div className="not-found__wrapper">
            <main className="not-found">
                <Heading
                    light={ false }
                    divider="colored"
                >
                    404: Not Found
                </Heading>
                <Paragraph>
                    Sorry, we couldn't find a page matching the URL you requested.
                </Paragraph>
                <StandardButton
                    size="Medium"
                    onClick={ () => history.goBack() }
                >
                    Go Back
                </StandardButton>
            </main>
        </div>
    );
    
};

export default NotFound;