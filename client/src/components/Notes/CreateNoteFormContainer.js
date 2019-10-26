import React from 'react';

import StandardButton from '../Buttons/StandardButton';

import CreateNoteForm from './CreateNoteForm';

const CreateNoteFormContainer = props => {
    return (
        <div className="create-note-form__container">
            <div className="create-note-form__button-wrapper">
                <StandardButton size="medium" onClick={ props.toggleShowCreateNote }>
                    Back
                </StandardButton>
            </div>
            <CreateNoteForm />
        </div>
    );
};

export default CreateNoteFormContainer;