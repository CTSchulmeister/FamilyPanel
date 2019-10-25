import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createHousehold } from '../../actions/householdActions';
import './CreateHouseholdForm.scss';

import FormErrorBoundary from '../Form/FormErrorBoundary';
import FormHeader from '../Form/FormHeader';
import TextInput from '../Form/TextInput';
import SubmitButton from '../Form/SubmitButton';

const inputRef = React.createRef();

class CreateHouseholdForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
        };

        this.handleChange.bind(this);
        this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        let key = event.target.name;
        let value = event.target.value;

        this.setState({
            [key]: value
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        try {
            this.props.createHousehold(this.state);
        } catch (err) {
            alert(`Error encountered: ${ err }`);
        }
    }

    componentDidMount() {
        if(!this.props.isActive) {
            setTimeout(() => {
                inputRef.current.focus();
            }, 1200);
        }
    }

    render() {
        return (
            <FormErrorBoundary formName="Create Household">
                <form className="form" onSubmit={ this.handleSubmit }>
                    <FormHeader text="Create a Household" />
                    <TextInput
                        type="text"
                        name="name"
                        value={ this.state.name }
                        onChange={ this.handleChange }
                        label="Household Name"
                        ref={ inputRef }
                    />
                    <SubmitButton text="Create" />
                </form>
            </FormErrorBoundary>
        );
    }
}

export default connect(null, { createHousehold })(CreateHouseholdForm);