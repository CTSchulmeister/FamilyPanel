import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNote } from '../actions/noteActions';
import { selectCurrentHousehold } from '../selectors/householdSelectors';

import CreateNoteForm from '../components/CreateNoteForm';

class CreateNoteFormContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            canSubmit: false,
            noteData: {
                householdId: this.props.currentHousehold._id,
                title: '',
                body: ''
            }
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
            noteData: {
                ...this.state.noteData,
                [key]: value
            },
            canSubmit: true
        });
    };

    handleSubmit = async event => {
        event.preventDefault();

        try {
            await this.props.createNote(this.state.noteData);
            this.props.toggleShowCreateNote();
        } catch (error) {
            // TODO: Handle error with logging
            alert(`Error encountered: ${ error }`);
        }
    };

    render() {
        const props = {
            canSubmit: this.state.canSubmit,
            ...this.state.noteData,
            handleChange: this.handleChange,
            handleSubmit: this.handleSubmit,
            toggleShowCreateNote: this.props.toggleShowCreateNote
        };

        return <CreateNoteForm {...props} />;
    }
}

const mapStateToProps = state => ({
    currentHousehold: selectCurrentHousehold(state)
});

export default connect(mapStateToProps, {
    createNote
})(CreateNoteFormContainer);