import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { 
    selectAuthenticationState,
    selectServerErrorStatus
} from '../../reducers/selectors';

import Heading from '../Typography/Heading';
import Paragraph from '../Typography/Paragraph';
import StandardButton from '../Buttons/StandardButton';

import LogInForm from '../LogInForm';
import RegistrationForm from '../RegistrationForm';
import NoServerConnection from '../Connection/NoServerConnection';

class Landing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formToShow: 'Log In',
            formComponent: <LogInForm history={ this.props.history } />,
            buttonIntro: 'Don\'t have an account yet?',
            buttonText: 'Register!'
        };

        this.toggleForm.bind(this);
    }

    toggleForm = () => {
        if(this.state.formToShow === 'Registration') {
            this.setState({
                formToShow: 'Log In',
                formComponent: <LogInForm history={ this.props.history } />,
                buttonIntro: 'Don\'t have an account yet?',
                buttonText: 'Register!'
            });
        } else {
            this.setState({
                formToShow: 'Registration',
                formComponent: <RegistrationForm history={ this.props.history } />,
                buttonIntro: 'Already have an account?',
                buttonText: 'Log in!'
            });
        }      
    }

    render() {
        if(this.props.serverIsDown) {
            return (
                <NoServerConnection history={ this.props.history } />
            );
        };

        if(this.props.isAuthenticated) {
            return (
                <Redirect to="/profile" />
            );
        };

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
                        <div className="landing__form-wrapper" ref={ this.formWrapper }>
                            { this.state.formComponent }
                        </div>
                        <hr className="landing__divider" />
                        <div className="landing__form-switcher">
                            { this.state.buttonIntro }
                            <StandardButton size="medium" onClick={ this.toggleForm }>
                                { this.state.buttonText }
                            </StandardButton>
                        </div>
                    </aside>
                    <div className="landing__decorative-panel">.</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: selectAuthenticationState(state),
        serverIsDown: selectServerErrorStatus(state)
    };
};

export default connect(mapStateToProps)(Landing);