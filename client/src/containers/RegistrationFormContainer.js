import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    selectRegistrationErrors 
} from '../selectors/userSelectors';
import { 
    registerUser 
} from '../actions/userActions';

import RegistrationForm from '../components/RegistrationForm';

class RegistrationFormContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            retypeEmail: '',
            password: '',
            retypePassword: ''
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
            await this.props.registerUser(this.state);
        } catch (error) {
            // TODO: Handle error with logging
            alert(`Error encountered: ${ error }`);
        }
    };

    render() {
        const props = {
            registrationErrors: this.props.registrationErrors,
            handleChange: this.handleChange,
            handleSubmit: this.handleSubmit,
            ...this.state
        };

        return <RegistrationForm {...props} />;
    }
}

const mapStateToProps = state => ({
    registrationErrors: selectRegistrationErrors(state)
});

export default connect(mapStateToProps, {
    registerUser
})(RegistrationFormContainer);