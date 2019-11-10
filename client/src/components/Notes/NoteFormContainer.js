import React from 'react';

import StandardButton from '../Buttons/StandardButton';

import CreateNote from '../../containers/CreateNote';
import UpdateNote from '../../containers/UpdateNote';

const NoteFormContainer = ({
    toggleShowCreateNote,
    toggleShowUpdateNote,
    form
}) => {
    let formToShow = null;
    let backButtonHandle = null;

    if(form === 'Create Note') {
        formToShow = <CreateNote toggleShowCreateNote={ toggleShowCreateNote } />
        backButtonHandle = toggleShowCreateNote
    } else if(form === 'Update Note') {
        formToShow = <UpdateNote />
        backButtonHandle = toggleShowUpdateNote
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