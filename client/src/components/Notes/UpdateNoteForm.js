import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateNote } from '../../actions/noteActions';
import {
    selectUser,
    selectCurrentHousehold,
    selectCurrentNote,
} from '../../reducers/selectors';

import FormErrorBoundary from '../Form/FormErrorBoundary';
import FormHeader from '../Form/FormHeader';
import TextInput from '../Form/TextInput';
import TextArea from '../Form/TextArea';
import SubmitButton from '../Form/SubmitButton';
import Heading from '../Typography/Heading';
import Paragraph from '../Typography/Paragraph';

class UpdateNoteForm extends Component {
    constructor(props) {
        super(props);

        if(this.props.user._id !== this.props.currentNote._creatorId) {
            this.state = {
                allowNoteUpdating: false
            };
        } else {
            this.state = {
                allowNoteUpdating: true,
                noteData: {
                    householdId: this.props.currentHousehold._id,
                    noteId: this.props.currentNote._id,
                    title: this.props.currentNote.title,
                    body: this.props.currentNote.body
                },
                submitButtonIsActive: false
            }
        }

        this.handleChange.bind(this);
        this.handleSubmit.bind(this);
    }

    handleChange = event => {
        let key = event.target.name;
        let value = event.target.value;

        this.setState({
            noteData: {
                ...this.state.noteData,
                [key]: value,
            },
            submitButtonIsActive: true
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        try {
            this.props.updateNote(this.state.noteData);
        } catch (err) {
            console.error(err);
        }
    };

    render() {
        if(!this.state.allowNoteUpdating) {
            return (
                <div>
                    <Heading>
                        Oops...
                    </Heading>
                    <Paragraph>
                        You are not allowed to update the note { this.props.currentNote.title }
                    </Paragraph>
                </div>
                
            );
        } else {
            return (
                <FormErrorBoundary formName="Update Note">
                    <form className="form" onSubmit={ this.handleSubmit }>
                        <FormHeader text={ `Update Note: ${ this.props.currentNote.title }` } />
                        <TextInput
                            type="text"
                            name="title"
                            value={ this.state.noteData.title }
                            onChange={ this.handleChange }
                            label="Title"
                        />
                        <TextArea
                            name="body"
                            value={ this.state.noteData.body }
                            onChange={ this.handleChange }
                            label="Body"
                        />
                        <SubmitButton 
                            text="Update" 
                            disabled={ !this.state.submitButtonIsActive } 
                        />
                    </form>
                </FormErrorBoundary>
            );
        }        
    }    
}

const mapStateToProps = state => {
    return {
        currentHousehold: selectCurrentHousehold(state),
        currentNote: selectCurrentNote(state),
        user: selectUser(state)
    };
}

export default connect(mapStateToProps, { updateNote })(UpdateNoteForm);