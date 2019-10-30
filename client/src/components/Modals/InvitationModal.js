import React, { Component } from 'react';
import { connect } from 'react-redux';

import ModalWrapper from './ModalWrapper';

import FormErrorBoundary from '../Form/FormErrorBoundary';
import FormHeader from '../Form/FormHeader';
import TextInput from '../Form/TextInput';
import TextArea from '../Form/TextArea';
import SubmitButton from '../Form/SubmitButton';
import StandardButton from '../Buttons/StandardButton';

class InvitationModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            message: ''
        };

        this.handleChange.bind(this);
        this.handleSubmit.bind(this);
    }

    handleChange = event => {
        let key = event.target.name;
        let value = event.target.value;

        this.setState({
            [key]: value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
    };

    render() {
        return (
            <ModalWrapper closeModalHandler={ this.props.toggleInvitationModal }>
                <div className="modal--invite">
                    <FormErrorBoundary formName="Invite User">
                        <form>
                            <FormHeader text="Invite User" />
                            <TextInput
                                type="email"
                                name="email"
                                value={ this.state.email }
                                onChange={ this.handleChange }
                                label="User's Email"
                            />
                            <TextArea
                                name="message"
                                value={ this.state.message }
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
                </div>
            </ModalWrapper>
        );
    }
}

export default connect()(InvitationModal);