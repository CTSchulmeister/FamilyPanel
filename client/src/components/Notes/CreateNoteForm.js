import React from 'react';
import PropTypes from 'prop-types';

import FormErrorBoundary from '../Form/FormErrorBoundary';
import FormHeader from '../Form/FormHeader';
import TextInput from '../Form/TextInput';
import TextArea from '../Form/TextArea';
import SubmitButton from '../Form/SubmitButton';

const CreateNoteForm = ({
    canSubmit,
    title,
    body,
    handleChange,
    handleSubmit
}) => {
    return (
        <FormErrorBoundary formName="Create Note">
            <form className="form" onSubmit={ handleSubmit }>
                <FormHeader>
                    Create Note
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
                    text="Create" 
                    disabled={ !canSubmit }
                />
            </form>
        </FormErrorBoundary>   
    );
};

CreateNoteForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    canSubmit: PropTypes.bool.isRequired
};

export default CreateNoteForm;