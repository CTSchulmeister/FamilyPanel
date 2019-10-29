import React from 'react';

import StandardButton from '../Buttons/StandardButton';

import CreateNoteForm from './CreateNoteForm';
import UpdateNoteForm from './UpdateNoteForm';

const NoteFormContainer = props => {
    let formToShow = null;
    let backButtonHandle;

    if(props.form === 'Create Note') {
        formToShow = <CreateNoteForm />
        backButtonHandle = props.toggleShowCreateNote
    } else if(props.form === 'Update Note') {
        formToShow = <UpdateNoteForm />
        backButtonHandle = props.toggleShowUpdateNote
    }

    return (
        <div className="note-form__container">
            <div className="note-form__button-wrapper">
                <StandardButton size="medium" onClick={ backButtonHandle }>
                    Back
                </StandardButton>
            </div>
            { formToShow }
        </div>
    );
};

export default NoteFormContainer;