import React from 'react';
import './NoteView.scss';
import { connect } from 'react-redux';

import NoteList from '../NoteList/NoteList';
import NoteDetails from '../NoteDetails/NoteDetails';

const NoteView = (props) => {
    return (
        <section className="note-view">
            <div className="note-view__header">
                <h2 className="note-view__heading">
                    Notes 
                    <span className="note-view__subheading">
                        from { props.householdName }
                    </span>
                </h2>
            </div>
            <NoteList />
            <NoteDetails />
        </section>
    );
};

const mapStateToProps = (state) => {
    return {
        householdName: state.households.currentHousehold.name
    };
};

export default connect(mapStateToProps)(NoteView);