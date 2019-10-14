import React, { Component } from 'react';
import './CreateNoteFormContainer.scss';

import CreateNoteForm from '../CreateNoteForm/CreateNoteForm';

class CreateNoteFormContainer extends Component {
    constructor(props) { 
        super(props);

        this.state = {
            isFormActive: (this.props.isFormActivate) || false
        };

        this.toggleForm = this.toggleForm.bind(this);
    }

    toggleForm() {
        this.setState({
            isFormActive: (this.state.isFormActive) ? false : true
        });
    }

    render() {
        if(this.state.isFormActive) {
            return (
                <div className="note-details note-details--form">
                    <div className="note-details__form-button-group">
                        <button className="button button--med" onClick={ this.toggleForm }>Go Back</button>
                    </div>
                    <div className="note-details__form-wrapper">
                        <CreateNoteForm />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="note-details note-details--no-notes">
                    <h3>You don't have any notes yet!</h3>
                    <span>Why don't you add one?</span>
                    <button className="button button--med" onClick={ this.toggleForm }>
                        Create Your First Note
                    </button>
                </div>
            );
        }
    }
}

export default CreateNoteFormContainer;