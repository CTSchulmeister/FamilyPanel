import React from 'react';
import { connect } from 'react-redux';
import { selectCurrentHousehold } from '../selectors/householdSelectors';
import { selectCurrentNote } from '../selectors/notesSelectors';
import { selectUser } from '../selectors/userSelectors';
import {
    deleteNote,
    editNote
} from '../actions/noteActions';

import NoteDetails from '../components/Notes/NoteDetails';

const NoteDetailsContainer = props => <NoteDetails {...props} />;

const mapStateToProps = state => ({
    currentHousehold: selectCurrentHousehold(state),
    currentNote: selectCurrentNote(state),
    user: selectUser(state)
});

export default connect(mapStateToProps, {
    deleteNote,
    editNote
})(NoteDetailsContainer);