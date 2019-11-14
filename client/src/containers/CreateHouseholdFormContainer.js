import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createHousehold } from '../actions/householdActions';
import history from '../history';

import CreateHouseholdForm from '../components/CreateHouseholdForm';

class CreateHouseholdFormContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ''
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
            await this.props.createHousehold(this.state);
            history.push('/home');
        } catch (error) {
            // TODO: Handle error with logging
            alert(`Error encountered creating household: ${ error }`);
        }
    };

    render() {
        const props = {
            handleChange: this.handleChange,
            handleSubmit: this.handleSubmit,
            className: this.props.className,
            ...this.state
        };

        return <CreateHouseholdForm {...props} />;
    }
}

export default connect(null, { 
    createHousehold 
})(CreateHouseholdFormContainer);