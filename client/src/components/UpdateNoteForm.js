import React from 'react';
import PropTypes from 'prop-types';

import FormErrorBoundary from './FormErrorBoundary';
import FormHeader from './FormHeader';
import TextInput from './TextInput';
import TextArea from './TextArea';
import SubmitButton from './SubmitButton';
import Heading from './Heading';
import Paragraph from './Paragraph';
import StandardButton from './StandardButton';

const UpdateNoteForm = ({
    allowNoteUpdating,
    submitButtonIsActive,
    currentNote,
    title,
    body,
    handleChange,
    handleSubmit,
    cancelEditNote
}) => {
    if(!allowNoteUpdating) {
        return (
            <div>
                <Heading>
                    Oops...
                </Heading>
                <Paragraph>
                    You are not allowed to update the note { currentNote.title }
                </Paragraph>
            </div>
        );
    } else {
        return (
            <div className="note-form__container">
                <div className="note-form__button-wrapper">
                    <StandardButton size="medium" onClick={ cancelEditNote }>
                        Back
                    </StandardButton>
                </div>
                <FormErrorBoundary formName="Update Note">
                    <form className="form" onSubmit={ handleSubmit }>
                        <FormHeader>
                            { `Update Note: ${ currentNote.title }` }
                        </FormHeader>
                        <TextInput
                            type="text"
                            name="title"
                            value={ title }
                            onChange={ handleChange }
                            label="Title"
                        />
                        <TextArea
                            name="body"
                            value={ body }
                            onChange={ handleChange }
                            label="Body"
                        />
                        <SubmitButton 
                            text="Update" 
                            disabled={ !submitButtonIsActive } 
                        />
                    </form>
                </FormErrorBoundary>
            </div>
        );
    } 
};

UpdateNoteForm.propTypes = {
    allowNoteUpdating: PropTypes.bool.isRequired,
    submitButtonIsActive: PropTypes.bool.isRequired,
    currentNote: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    cancelEditNote: PropTypes.func.isRequired
};

export default UpdateNoteForm;