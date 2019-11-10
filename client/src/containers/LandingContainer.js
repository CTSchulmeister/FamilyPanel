import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectAuthenticationState } from '../selectors/userSelectors';
import { selectServerErrorStatus } from '../selectors/serverSelectors';

import LogIn from './LogIn';
import Register from './Register';
import Landing from '../components/Landing';

class LandingContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formToShow: `Log In`,
            formComponent: <LogIn history={ this.props.history } />,
            buttonIntro: `Don't have an account yet?`,
            buttonText: `Register!`
        };

        this.toggleForm.bind(this);
    }

    toggleForm = () => {
        if(this.state.formToShow === 'Log In') {
            this.setState({
                formToShow: `Registration`,
                formComponent: <Register history={ this.props.history } />,
                buttonIntro: `Already have an account?`,
                buttonText: `Log in!`
            });
        } else {
            this.setState({
                formToShow: `Log In`,
                formComponent: <LogIn history={ this.props.history } />,
                buttonIntro: `Don't have an account yet?`,
                buttonText: `Register!`
            });
        }
    };

    render() {
        const props = {
            ...this.state,
            ...this.props,
            history: this.props.history,
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