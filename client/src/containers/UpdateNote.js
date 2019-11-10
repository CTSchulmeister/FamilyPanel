import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateNote } from '../actions/noteActions';
import { selectUser } from '../selectors/userSelectors';
import { selectCurrentHousehold } from '../selectors/householdSelectors';
import { selectCurrentNote } from '../selectors/notesSelectors';

import UpdateNoteForm from '../components/Notes/UpdateNoteForm';

class UpdateNote extends Component {
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
            };
        }

        this.handleChange.bind(this);
        this.handleSubmit.bind(this);
    }

    handleChange = event => {
        const { 
            name: key,
            value
        } = event.target;

        this.setState({
            noteData: {
                ...this.state.noteData,
                [key]: value
            },
            submitButtonIsActive: true
        });
    };

    handleSubmit = async event => {
        event.preventDefault();

        try {
            await this.props.updateNote(this.state.noteData);
        } catch (error) {
            // TODO: Handle error with logging
            alert(`Error encountered: ${ error }`);
        }
    };

    render() {
        const props = {
            allowNoteUpdating: this.state.allowNoteUpdating,
            submitButtonIsActive: this.state.submitButtonIsActive,
            currentNote: this.props.currentNote,
            title: this.state.noteData.title,
            body: this.state.noteData.body,
            handleChange: this.handleChange,
            handleSubmit: this.handleSubmit
        };

        return <UpdateNoteForm {...props} />;
    }
}

const mapStateToProps = state => ({
    currentHousehold: selectCurrentHousehold(state),
    currentNote: selectCurrentNote(state),
    user: selectUser(state)
});

export default connect(mapStateToProps, {
    updateNote
})(UpdateNote);