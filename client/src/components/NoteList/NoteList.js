import React from 'react';
import { connect } from 'react-redux';
import './NoteList.scss';

import NoteSummary from '../NoteSummary/NoteSummary';

const NoteList = (props) => {
    let displayedNumberOfNotes = '';

    if(props.currentHousehold.notes.length === 1) {
        displayedNumberOfNotes = '1 Note';
    } else {
        displayedNumberOfNotes = `${ props.currentHousehold.notes.length } Notes`;
    }

    let notes = props.currentHousehold.notes.map((note, index, array) => {
        let divider = (index !== array.length - 1) ? <hr className="note-list__divider"/> : null;
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
                { divider }
            </React.Fragment>
        );
    });

    return (
        <div className="note-list">
            <div className="note-list__header">
                { displayedNumberOfNotes }
                <button
                    className="button button--sqr"
                >
                    <i className="fas fa-plus"></i>
                </button>
            </div>
            <div className="note-list__list">
                { notes }
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        currentHousehold: state.households.currentHousehold,
        currentNote: state.notes.currentNote
    };
}

export default connect(mapStateToProps)(NoteList);