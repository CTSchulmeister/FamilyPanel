import React from 'react';
import './NoteView.scss';

import RegistrationForm from '../../registrationForm/RegistrationForm';

const NoteView = (props) => {
    return (
        <div className="note-view">
            <div className="note-view__header">
                <h1>Notes</h1>
            </div>
            <div className="note-view__notes-container">
                <div className="note-view__summaries">
                </div>
                <RegistrationForm />
            </div>
            
        </div>
    );
};

export default NoteView;