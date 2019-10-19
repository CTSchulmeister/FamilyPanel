import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import TopBar from '../TopBar';
import SideBar from '../SideBar';

import NotesHeader from './NotesHeader';
import NotesList from './NotesList';
import NoteDetails from './NoteDetails';
import CreateNoteForm from './CreateNoteForm';

import RequiresAuthentication from '../RequiresAuthentication';

const Notes = (props) => {
    if(props.isAuthenticated) {
        let mainSection = (props.showCreateNoteForm) 
            ? (
                <div className="note-form__container">
                    <div className="note-form__back-button-wrapper">
                        <Link to="/notes" className="button button--med">
                            Go Back
                        </Link>
                    </div>
                    <div className="note-form__wrapper">
                        <CreateNoteForm history={ props.history } />
                    </div>
                </div>
            )
            : <NoteDetails />;

        return (
            <div className="app-container">
                <TopBar />
                <SideBar activeLink="notes" />
                <div className="main notes__wrapper">
                    <section className="notes__view">
                        <NotesHeader />
                        <NotesList />
                        { mainSection }
                    </section>
                </div>
            </div>
        );
    } else {
        return (
            <RequiresAuthentication />
        );
    }
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.authenticated
    };
};

export default connect(mapStateToProps)(Notes);