import React from 'react';
import PropTypes from 'prop-types';

import FormErrorBoundary from './FormErrorBoundary';
import FormHeader from './FormHeader';
import TextInput from './TextInput';
import TextArea from './TextArea';
import SubmitButton from './SubmitButton';
import StandardButton from './StandardButton';

const CreateNoteForm = ({
    canSubmit,
    title,
    body,
    handleChange,
    handleSubmit,
    toggleShowCreateNote
}) => {
    return (
        <div className="note-form__container">
            <div className="note-form__button-wrapper">
                <StandardButton size="medium" onClick={ toggleShowCreateNote }>
                    Back
                </StandardButton>
            </div>
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
                        maxLength={ 50 }
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
        </div>
    );
};

CreateNoteForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    canSubmit: PropTypes.bool.isRequired,
    toggleShowCreateNote: PropTypes.func.isRequired
};

export default CreateNoteForm;