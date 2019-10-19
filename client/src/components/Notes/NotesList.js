import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import NoteSummary from './NoteSummary';

const NotesList = (props) => {
    let displayedNumberOfNotes = '';

    if(props.currentHousehold.notes.length === 1) {
        displayedNumberOfNotes = '1 Note';
    } else {
        displayedNumberOfNotes = `${ props.currentHousehold.notes.length } Notes`;
    }

    let notes = props.currentHousehold.notes.map((note, index, array) => {
        let isActive = (props.currentNote && props.currentNote._id === note._id) ? true : false;

        return (
            <React.Fragment>
                <NoteSummary 
                    key={ note._id }
                    noteId={ note._id }
                    isActive={ isActive }
                    title={ note.title }
                    body={ note.body }
                />
            </React.Fragment>
        );
    });

    return (
        <div className="notes-list">
            <div className="notes-list__header">
                { displayedNumberOfNotes }
                <Link to="/notes/create-note" className="button button--sqr">
                    <i className="fas fa-plus"></i>
                </Link>
            </div>
            <div className="notes-list__list">
                { notes }
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        currentHousehold: state.households.currentHousehold,
        currentNote: state.households.currentNote
    };
}

export default connect(mapStateToProps)(NotesList);