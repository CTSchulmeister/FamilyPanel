import React, { Component } from 'react';

import SectionHeader from '../Layout/SectionHeader';

import NotesList from './NotesList';
import NoteDetails from './NoteDetails';
import ShowCreateNoteContainer from './CreateNoteFormContainer';

class Notes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showCreateNote: false
        };

        this.toggleShowCreateNote.bind(this);
    }

    toggleShowCreateNote = () => {
        this.setState({
            showCreateNote: (this.state.showCreateNote) ? false : true
        });
    }

    render() {
        const detailsSection = (this.state.showCreateNote)
            ? <ShowCreateNoteContainer toggleShowCreateNote={ this.toggleShowCreateNote } />
            : <NoteDetails />;

        return (
            <section className="notes">
                <SectionHeader title="Notes" />
                <NotesList toggleShowCreateNote={ this.toggleShowCreateNote } />
                { detailsSection }
            </section>
        );
    }
}

export default Notes;