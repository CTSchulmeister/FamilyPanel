import React, { Component } from 'react';
import { connect } from 'react-redux';
import './NoteDetails.scss';

import CreateNoteFormContainer from '../CreateNoteFormContainer/CreateNoteFormContainer';

class NoteDetails extends Component {
    render() {
        if(this.props.currentHousehold.notes.length === 0) {
            return (
                <CreateNoteFormContainer />
            );
        } else if(this.props.currentNote) {
            let body = this.props.currentNote.body;

            return (
                <div className="note-details note-details--active-note">
                    <h2 className="note-details__title">{ this.props.currentNote.title }</h2>
                    <div className="note-details__divider"></div>
                    <div className="note-details__from-label note-details__label">From</div>
                    <div className="note-details__note-author">
                        <img 
                            className="note-details__photo" 
                            src={ process.env.PUBLIC_URL + '/anonymousProfilePicture.png ' }
                            alt='Anonymous Profile PH'
                        />
                        Person
                    </div>
                    <div className="note-details__body-label note-details__label">Body</div>
                    <div className="note-details__body">{ body }</div>
                </div>
            );
        } else {
            return (
                <div className="note-details">

                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        currentHousehold: state.households.currentHousehold,
        currentNote: state.notes.currentNote
    };
}

export default connect(mapStateToProps)(NoteDetails);