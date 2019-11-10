import React from 'react';
import PropTypes from 'prop-types';

import FormErrorBoundary from '../Form/FormErrorBoundary';
import FormHeader from '../Form/FormHeader';
import TextInput from '../Form/TextInput';
import TextArea from '../Form/TextArea';
import SubmitButton from '../Form/SubmitButton';
import Heading from '../Typography/Heading';
import Paragraph from '../Typography/Paragraph';

const UpdateNoteForm = ({
    allowNoteUpdating,
    submitButtonIsActive,
    currentNote,
    title,
    body,
    handleChange,
    handleSubmit
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
    handleSubmit: PropTypes.func.isRequired
};

export default UpdateNoteForm;