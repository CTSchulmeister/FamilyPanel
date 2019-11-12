import React from 'react';
import { connect } from 'react-redux';
import { clearServerErrors } from '../actions/serverActions';

import Heading from './Heading';
import Paragraph from './Paragraph';
import StandardButton from './StandardButton';

const NoServerConnection = props => {
    const clearErrors = () => {
        props.clearServerErrors();
        props.history.push('/');
    };

    return (
        <div className="full-screen-wrapper">
            <div className="error-message">
                <Heading light={ false } divider='colored'>
                    Sorry...
                </Heading>
                <Paragraph>
                    It appears the FamilyPanel servers are down at the moment.
                </Paragraph>
                <Paragraph>
                    We apologize for the inconvenience and will try to have service up as quick as possible.
                </Paragraph>
                <Paragraph>
                    Please try again later.
                </Paragraph>
                <StandardButton size="medium" onClick={ clearErrors }>
                    Back to Home
                </StandardButton>
            </div>
        </div>
    );
};

export default connect(null, { clearServerErrors })(NoServerConnection);