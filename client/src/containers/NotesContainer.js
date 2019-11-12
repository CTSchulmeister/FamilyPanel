import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    selectCurrentNote 
} from '../selectors/notesSelectors';

import Notes from '../components/Notes';

class NotesContainer extends Component {
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
    };

    render() {
        const props = {
            showCreateNote: this.state.showCreateNote,
            toggleShowCreateNote: this.toggleShowCreateNote,
            ...this.props
        };

        return (
            <Notes { ...props } />
        );
    }
}

const mapStateToProps = state => ({
    currentNote: selectCurrentNote(state)
});

export default connect(mapStateToProps)(NotesContainer);