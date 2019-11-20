import React from 'react';
import PropTypes from 'prop-types';

import SectionHeader from './SectionHeader';
import AppContainer from '../containers/AppContainer';
import NotesListContainer from '../containers/NotesListContainer';
import CreateNoteFormContainer from '../containers/CreateNoteFormContainer';
import UpdateNoteFormContainer from '../containers/UpdateNoteFormContainer';
import NoteDetailsContainer from '../containers/NoteDetailsContainer';

const Notes = ({
    showCreateNote,
    toggleShowCreateNote,
    currentNote
}) => {
    const listProps = {
        showCreateNote: showCreateNote,
        toggleShowCreateNote: toggleShowCreateNote
    };

    let detailsSection = null;

    if(currentNote && currentNote.isEditing) {
        detailsSection = <UpdateNoteFormContainer />
    } else if(showCreateNote) {
        detailsSection = <CreateNoteFormContainer toggleShowCreateNote={ toggleShowCreateNote } />
    } else {
        detailsSection = <NoteDetailsContainer />;
    }

    return (
        <AppContainer activeLink="notes">
            <section className="notes">
                <SectionHeader title="Notes" />
                <NotesListContainer {...listProps } />
                { detailsSection }
            </section>
        </AppContainer>
    );
};

Notes.propTypes = {
    showCreateNote: PropTypes.bool.isRequired,
    toggleShowCreateNote: PropTypes.func.isRequired,
    currentNote: PropTypes.object
};

export default Notes;