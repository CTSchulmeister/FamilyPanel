import React from 'react'
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import NoServerConnection from './NoServerConnection';

import Heading from './Typography/Heading';
import Paragraph from './Typography/Paragraph';
import StandardButton from './Buttons/StandardButton';

const Landing = ({
    isAuthenticated,
    serverIsDown,
    formComponent,
    buttonIntro,
    buttonText,
    history,
    toggleForm
}) => {
    if(serverIsDown) return <NoServerConnection history={ history } />;
    if(isAuthenticated) return <Redirect to="/profile" />;

    return (
        <div className="landing">
            <div className="landing__main-container">
                <main className="landing__main">
                    <Heading light={ true } divider="colored">
                        FamilyPanel
                    </Heading>
                    <Paragraph light={ true }>
                        FamilyPanel allows your household to easily coordinate with one another.
                    </Paragraph>
                    <Paragraph light={ true }>
                        Create events, assign tasks, and leave notes for each other.
                        Keeping your household organized is easy with FamilyPanel there to help you.
                    </Paragraph>
                </main>
                <aside className="landing__form-container">
                    <div className="landing__form-wrapper">
                        { formComponent }
                    </div>
                    <hr className="landing__divider" />
                    <div className="landing__form-switcher">
                        { buttonIntro }
                        <StandardButton size="medium" onClick={ toggleForm }>
                            { buttonText }
                        </StandardButton>
                    </div>
                </aside>
                <div className="landing__decorative-panel"></div>
            </div>
        </div>
    );
};

Landing.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    serverIsDown: PropTypes.bool.isRequired,
    formComponent: PropTypes.node.isRequired,
    buttonIntro: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    toggleForm: PropTypes.func.isRequired
};

export default Landing;