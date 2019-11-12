import React from 'react';
import PropTypes from 'prop-types';

import CircleButton from './CircleButton';
import NoteSummaryContainer from '../containers/NoteSummaryContainer';

const getDisplayedNumberOfNotes = notes => {
    if(notes.length === 1) {
        return `1 Note`;
    } else {
        return `${ notes.length } Notes`;
    }
};

const NotesList = ({
    currentHousehold,
    currentNote,
    toggleShowCreateNote
}) => {
    const displayedNumberOfNotes = getDisplayedNumberOfNotes(currentHousehold.notes);
    const notes = currentHousehold.notes.map(note => {
        return (
            <NoteSummaryContainer
                key={ note._id }
                noteId={ note._id }
                creatorId={ note._creatorId }
                createdAt={ new Date(note.createdAt) }
                isActive={ (currentNote && currentNote._id === note._id) ? true : false }
                title={ note.title }
                body={ note.body }
            />
        )
    });

    return (
        <div className="notes-list">
            <div className="notes-list__header">
                { displayedNumberOfNotes }
                <CircleButton
                    light={ false }
                    onClick={ toggleShowCreateNote }
                    disabled={ currentNote && currentNote.isEditing }
                    tooltipText="Create Note"
                >
                    <i className="fas fa-edit"></i>
                </CircleButton>
            </div>
            <div className="notes-list__list">
                { notes }
            </div>
        </div>
    )

};

NotesList.propTypes = {
    currentHousehold: PropTypes.object.isRequired,
    currentNote: PropTypes.object.isRequired
};

export default NotesList;