import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectAuthenticationState } from '../selectors/userSelectors';
import { selectServerErrorStatus } from '../selectors/serverSelectors';

import LogInFormContainer from './LogInFormContainer';
import RegistrationFormContainer from './RegistrationFormContainer';
import Landing from '../components/Landing';

import history from '../history';

class LandingContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formToShow: `Log In`,
            formComponent: <LogInFormContainer />,
            buttonIntro: `Don't have an account yet?`,
            buttonText: `Register!`
        };

        this.toggleForm.bind(this);
    }

    toggleForm = () => {
        if(this.state.formToShow === 'Log In') {
            this.setState({
                formToShow: `Registration`,
                formComponent: <RegistrationFormContainer />,
                buttonIntro: `Already have an account?`,
                buttonText: `Log in!`
            });
        } else {
            this.setState({
                formToShow: `Log In`,
                formComponent: <LogInFormContainer />,
                buttonIntro: `Don't have an account yet?`,
                buttonText: `Register!`
            });
        }
    };

    render() {
        const props = {
            ...this.state,
            ...this.props,
            history: history,
            toggleForm: this.toggleForm
        };

        return <Landing { ...props } />;
    }
}

const mapStateToProps = state => ({
    isAuthenticated: selectAuthenticationState(state),
    serverIsDown: selectServerErrorStatus(state)
});

export default connect(mapStateToProps)(LandingContainer);