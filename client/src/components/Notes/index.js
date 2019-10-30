import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectCurrentNote } from '../../reducers/selectors';
import { editNote, cancelEditNote } from '../../actions/noteActions';

import SectionHeader from '../Layout/SectionHeader';

import NotesList from './NotesList';
import NoteDetails from './NoteDetails';
import NoteFormContainer from './NoteFormContainer';

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
        let detailsSection = null;

        if(this.props.currentNote && this.props.currentNote.isEditing) {
            detailsSection = <NoteFormContainer form='Update Note' toggleShowUpdateNote={ this.props.cancelEditNote } />
        } else if(this.state.showCreateNote) {
            detailsSection = <NoteFormContainer form='Create Note' toggleShowCreateNote={ this.toggleShowCreateNote } />
        } else {
            detailsSection = <NoteDetails toggleShowUpdateNote={ this.toggleShowUpdateNote } />;
        }

        return (
            <section className="notes">
                <SectionHeader title="Notes" />
                <NotesList toggleShowCreateNote={ this.toggleShowCreateNote } allowCreateNote={ !this.state.showUpdateNote }/>
                { detailsSection }
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentNote: selectCurrentNote(state)
    };
}

export default connect(mapStateToProps, { editNote, cancelEditNote })(Notes);