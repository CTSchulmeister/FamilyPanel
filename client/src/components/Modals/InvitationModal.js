import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    createInvitation,
    clearInvitationErrors 
} from '../../actions/invitationActions';
import { 
    selectCurrentHousehold, 
    selectUser,
    selectInvitationCreationError
} from '../../reducers/selectors';

import ModalWrapper from './ModalWrapper';

import FormErrorBoundary from '../Form/FormErrorBoundary';
import FormHeader from '../Form/FormHeader';
import TextInput from '../Form/TextInput';
import TextArea from '../Form/TextArea';
import SubmitButton from '../Form/SubmitButton';
import StandardButton from '../Buttons/StandardButton';

import Heading from '../Typography/Heading';
import Paragraph from '../Typography/Paragraph';

class InvitationModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            invitationCreatedSuccesfully: false,
            invitationData: {
                householdId: props.currentHousehold._id,
                senderId: props.user._id,
                recieverEmail: '',
                message: ''
            }
        };

        this.handleChange.bind(this);
        this.handleSubmit.bind(this);
    }

    handleChange = event => {
        let key = event.target.name;
        let value = event.target.value;

        this.setState({
            invitationData: {
                ...this.state.invitationData,
                [key]: value
            }
        });
    };

    handleSubmit = async event => {
        event.preventDefault();

        try {
            await this.props.clearInvitationErrors();
            await this.props.createInvitation(this.state.invitationData);
        } catch (e) {
            alert(`Error encountered: ${ e }`);
        }

        if(this.props.invitationCreationError === null) {
            this.setState({
                invitationCreatedSuccesfully: true
            });
        }
    };

    render() {
        let errors = null;

        if(this.props.invitationCreationError !== null) {
            const errorItems = this.props.invitationCreationError.map(error => {
                return (
                    <li className="form__error">
                        { error.msg }
                    </li>
                );
            });

            errors = (
                <div className="form__errors">
                    <span className="form__errors-header">Errors:</span>
                    <ul className="form__errors-list">
                        { errorItems }
                    </ul>
                </div>
            );
        }

        const modalContent = (!this.state.invitationCreatedSuccesfully)
            ? (
                <FormErrorBoundary formName="Invite User">
                    { errors }
                        <form onSubmit={ this.handleSubmit }>
                            <FormHeader text="Invite User" />
                            <TextInput
                                type="email"
                                name="recieverEmail"
                                value={ this.state.invitationData.recieverEmail }
                                onChange={ this.handleChange }
                                label="User's Email"
                            />
                            <TextArea
                                name="message"
                                value={ this.state.invitationData.message }
                                onChange={ this.handleChange }
                                label="Leave a message?"
                            />
                            <div className="modal__button-container">
                                <StandardButton 
                                    size="medium"
                                    onClick={ this.props.toggleInvitationModal }
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
                        { ` ${ this.state.invitationData.recieverEmail }` } will recieve your invitation.
                    </Paragraph>
                    <StandardButton 
                        size="medium"
                        onClick={ this.props.toggleInvitationModal }
                    >
                        Close
                    </StandardButton>
                </React.Fragment>
            );

        return (
            <ModalWrapper closeModalHandler={ this.props.toggleInvitationModal }>
                <div className="modal--invite">
                    { modalContent }
                </div>
            </ModalWrapper>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentHousehold: selectCurrentHousehold(state),
        user: selectUser(state),
        invitationCreationError: selectInvitationCreationError(state)
    };
};

export default connect(mapStateToProps, { createInvitation, clearInvitationErrors })(InvitationModal);