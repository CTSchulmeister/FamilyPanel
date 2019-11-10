import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNote } from '../actions/noteActions';
import { selectCurrentHousehold } from '../selectors/householdSelectors';

import CreateNoteForm from '../components/Notes/CreateNoteForm';

class CreateNote extends Component {
    constructor(props) {
        super(props);

        this.state = {
            householdId: this.props.currentHousehold._id,
            title: '',
            body: ''
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
            await this.props.createNote(this.state);
        } catch (error) {
            // TODO: Handle error with logging
            alert(`Error encountered: ${ error }`);
        }
    };

    render() {
        const props = {
            ...this.state,
            handleChange: this.handleChange,
            handleSubmit: this.handleSubmit
        };

        return <CreateNoteForm {...props} />;
    }
}

const mapStateToProps = state => ({
    currentHousehold: selectCurrentHousehold(state)
});

export default connect(mapStateToProps, {
    createNote
})(CreateNote);