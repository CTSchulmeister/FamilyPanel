import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormErrorBoundary from './FormErrorBoundary';
import FormHeader from './FormHeader';
import TextInputWithRef from './TextInputWithRef';
import SubmitButton from './SubmitButton';

const inputRef = React.createRef();

class CreateHouseholdForm extends Component {
    componentDidMount() {
        setTimeout(() => {
            inputRef.current.focus();
        }, 1200);
    }

    render() {
        const { 
            handleChange,
            handleSubmit,
            className,
            name
        } = this.props;

        return (
            <FormErrorBoundary formName="Create Household">
                <form className={ `form ${ className }` } onSubmit={ handleSubmit }>
                    <FormHeader small={ true }>
                        Create Household
                    </FormHeader>
                    <TextInputWithRef
                        type="text"
                        name="name"
                        value={ name }
                        onChange={ handleChange }
                        label="Household Name"
                        ref={ inputRef }
                    />
                    <SubmitButton text="Create" />
                </form>
            </FormErrorBoundary>
        );
    }
}

CreateHouseholdForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default CreateHouseholdForm;