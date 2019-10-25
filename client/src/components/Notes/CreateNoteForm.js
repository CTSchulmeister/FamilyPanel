import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNote } from '../../actions/noteActions';

import FormErrorBoundary from '../Form/FormErrorBoundary';
import FormHeader from '../Form/FormHeader';
import TextInput from '../Form/TextInput';
import TextArea from '../Form/TextArea';
import SubmitButton from '../Form/SubmitButton';

class CreateNoteForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            householdId: this.props.currentHouseholdId,
            title: '',
            body: ''
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

        if(event.target.name === 'body') {
            if(event.target.value !== '') {
                let label = event.target.parentElement.querySelector('.form__label--text-area');
                label.classList.add('form__label--text-area--not-empty');
            } else {
                let label = event.target.parentElement.querySelector('.form__label--text-area');
                label.classList.remove('form__label--text-area--not-empty');
            }
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        try {
            let noteBody = {...this.state};

            if(noteBody.body === '') {
                noteBody.body = null;
            }

            this.props.createNote(noteBody);

            this.props.history.push('/notes');
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        return (
            <FormErrorBoundary formName="Create Note">
                <form className="form" onSubmit={ this.handleSubmit }>
                    <FormHeader text="Create Note" />
                    <TextInput
                        type="text"
                        name="title"
                        value={ this.state.title }
                        onChange={ this.handleChange }
                        label="Title"
                    />
                    <TextArea
                        name="body"
                        value={ this.state.body }
                        onChange={ this.handleChange }
                        label="Body"
                    />
                    <SubmitButton text="Create" />
                </form>
            </FormErrorBoundary>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        householdId: state.households.currentHousehold._id
    };
}

export default connect(mapStateToProps, { createNote })(CreateNoteForm);