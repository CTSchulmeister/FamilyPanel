import React from 'react';
import { connect } from 'react-redux';
import {
    selectCurrentHousehold
} from '../selectors/householdSelectors';
import {
    selectCurrentNote
} from '../selectors/notesSelectors';

import NotesList from '../components/NotesList';

const NotesListContainer = props => <NotesList { ...props } />;

const mapStateToProps = state => ({
    currentHousehold: selectCurrentHousehold(state),
    currentNote: selectCurrentNote(state)
});

export default connect(mapStateToProps)(NotesListContainer);