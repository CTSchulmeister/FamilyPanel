import React from 'react';
import PropTypes from 'prop-types';

import FormErrorBoundary from './FormErrorBoundary';
import FormHeader from './FormHeader';
import TextInput from './TextInput';
import TextArea from './TextArea';
import SubmitButton from './SubmitButton';
import StandardButton from './StandardButton';

import Heading from './Heading';
import Paragraph from './Paragraph';

const formatErrors = errors => {
    let incrementedKey = 0;

    const formattedErrors = errors.map(error => {
        incrementedKey++;

        return (
            <li className="form__error" key={ incrementedKey }>
                { error.msg }
            </li>
        );
    });

    return (
        <div className="form__errors">
            <span className="form__errors-header">Errors:</span>
            <ul className="form__errors-list">
                { formattedErrors }
            </ul>
        </div>
    );
};

const InvitationModalContent = ({
    invitationCreationError,
    invitationCreatedSuccesfully,
    handleSubmit,
    handleChange,
    toggleIsShown,
    recieverEmail,
    message,
    clearInvitationErrors,
    currentHousehold
}) => {
    const errors = invitationCreationError ? formatErrors(invitationCreationError) : null;

    const handleCancelClick = () => {
        clearInvitationErrors();
        toggleIsShown();
    };

    const modalContent = !invitationCreatedSuccesfully
        ? (
            <FormErrorBoundary formName="Invite User">
                { errors }
                    <form onSubmit={ handleSubmit }>
                        <FormHeader>
                            Invite User
                        </FormHeader>
                        <TextInput
                            type="email"
                            name="recieverEmail"
                            value={ recieverEmail }
                            onChange={ handleChange }
                            label="User's Email"
                        />
                        <TextArea
                            name="message"
                            value={ message }
                            onChange={ handleChange }
                            label="Leave a message?"
                        />
                        <div className="modal__button-container">
                            <StandardButton 
                                size="medium"
                                onClick={ handleCancelClick }
                            >
                                Cancel
                            </StandardButton>
                            <SubmitButton text="Invite" />
                        </div>
                    </form>
            </FormErrorBoundary>
        )
        : (
            <React.Fragment>
                <Heading
                    light={ false }
                    divider="colored"
                >
                    Woo!
                </Heading>
                <Paragraph>
                    Invitation created succesfully.
                </Paragraph>
                <Paragraph>
                    { recieverEmail } will recieve your invitation to { currentHousehold.name }.
                </Paragraph>
                <StandardButton 
                    size="medium"
                    onClick={ toggleIsShown }
                >
                    Close
                </StandardButton>
            </React.Fragment>
        );

    return (
        <div className="modal modal--invite">
            { modalContent }
        </div>
    );
};

InvitationModalContent.propTypes = {
    invitationCreationError: PropTypes.array,
    invitationCreatedSuccesfully: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    toggleIsShown: PropTypes.func.isRequired,
    recieverEmail: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    clearInvitationErrors: PropTypes.func.isRequired
};

export default InvitationModalContent;