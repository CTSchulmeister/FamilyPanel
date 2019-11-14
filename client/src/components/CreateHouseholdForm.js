import React from 'react';
import PropTypes from 'prop-types';

import AppContainer from '../containers/AppContainer';
import FormErrorBoundary from './FormErrorBoundary';
import FormHeader from './FormHeader';
import TextInput from './TextInput';
import SubmitButton from './SubmitButton';
import SubHeading from './SubHeading';
import SectionHeader from './SectionHeader';

const CreateHouseholdForm = ({
    handleChange,
    handleSubmit,
    className,
    name
}) => {
    return (
        <AppContainer activeLink={ null }>
            <section className="create-household">
                <SectionHeader title="Create Household" />
                <div className="create-household__form-wrapper">
                    <FormErrorBoundary formName="Create Household">
                        <form className={ `form ${ className }` } onSubmit={ handleSubmit }>
                            <FormHeader>
                                Create Household
                            </FormHeader>
                            <TextInput
                                type="text"
                                name="name"
                                value={ name }
                                onChange={ handleChange }
                                label="Household Name"
                            />
                            <SubHeading light={ false }>
                                Settings:
                            </SubHeading>
                            <SubmitButton text="Create" />
                        </form>
                    </FormErrorBoundary>
                </div>
            </section>
        </AppContainer>
    );
};

CreateHouseholdForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default CreateHouseholdForm;