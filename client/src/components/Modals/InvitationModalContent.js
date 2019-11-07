import React from 'react';
import PropTypes from 'prop-types';

import FormErrorBoundary from '../Form/FormErrorBoundary';
import FormHeader from '../Form/FormHeader';
import TextInput from '../Form/TextInput';
import TextArea from '../Form/TextArea';
import SubmitButton from '../Form/SubmitButton';
import StandardButton from '../Buttons/StandardButton';

import Heading from '../Typography/Heading';
import Paragraph from '../Typography/Paragraph';

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
    message
}) => {
    const errors = invitationCreationError ? formatErrors(invitationCreationError) : null;

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
                                onClick={ toggleIsShown }
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
                    &nbsp;{ recieverEmail } will recieve your invitation.
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
    invitationCreationError: PropTypes.object.isRequired,
    invitationCreatedSuccesfully: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    toggleIsShown: PropTypes.func.isRequired,
    recieverEmail: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
};

export default InvitationModalContent;