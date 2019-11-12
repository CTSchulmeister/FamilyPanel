import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectLogInErrors } from '../selectors/userSelectors';
import { logUserIn } from '../actions/userActions';

import LogInForm from '../components/LogInForm';

class LogInFormContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.handleChange.bind(this);
        this.handleSubmit.bind(this);
    }

    handleChange = event => {
        const {
            name: key,
            value
        } = event.target;

        this.setState({
            [key]: value
        });
    };

    handleSubmit = async event => {
        event.preventDefault();

        try {
            await this.props.logUserIn(this.state);
        } catch (error) {
            // TODO: Handle error with logging
            alert(`Error encountered: ${ error }`);
        }
    };

    render() {
        const props = {
            logInErrors: this.props.logInErrors,
            handleChange: this.handleChange,
            handleSubmit: this.handleSubmit,
            ...this.state
        };

        return <LogInForm {...props} />;
    }
}

const mapStateToProps = state => ({
    logInErrors: selectLogInErrors(state)
});

export default connect(mapStateToProps, {
    logUserIn
})(LogInFormContainer);