import React from 'react';
import { connect } from 'react-redux';
import { selectCurrentNote, selectCurrentHousehold } from '../../reducers/selectors';

import CircleButton from '../Buttons/CircleButton';

import NoteSummary from './NoteSummary';

const NotesList = (props) => {
    let displayedNumberOfNotes = '';

    if(props.currentHousehold.notes.length === 1) {
        displayedNumberOfNotes = '1 Note';
    } else {
        displayedNumberOfNotes = `${ props.currentHousehold.notes.length } Notes`;
    }

    const notes = props.currentHousehold.notes.map(note => {
        return (
            <NoteSummary 
                key={ note._id }
                noteId={ note._id }
                creatorId={ note._creatorId }
                createdAt={ new Date(note.createdAt) }
                isActive={ (props.currentNote && props.currentNote._id === note._id) ? true : false }
                title={ note.title }
                body={ note.body }
            />
        );
    });

    return (
        <div className="notes-list">
            <div className="notes-list__header">
                { displayedNumberOfNotes }
                <CircleButton 
                    light={ false }
                    onClick={ props.toggleShowCreateNote } 
                    disabled={ props.currentNote && props.currentNote.isEditing }
                    tooltipText="Create Note"
                >
                    <i className="fas fa-edit"></i>
                </CircleButton>
            </div>
            <div className="notes-list__list">
                { notes }
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        currentHousehold: selectCurrentHousehold(state),
        currentNote: selectCurrentNote(state)
    };
}

export default connect(mapStateToProps)(NotesList);