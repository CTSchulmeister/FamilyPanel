import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    createInvitation,
    clearInvitationErrors
} from '../actions/invitationActions';
import { selectCurrentHousehold } from '../selectors/householdSelectors';
import { selectUser } from '../selectors/userSelectors';
import { selectInvitationCreationError } from '../selectors/invitationSelectors';

import InvitationModalContent from '../components/Modals/InvitationModalContent';

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
        const {
            name: key,
            value
        } = event.target;

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
            await this.props.clearInvitationErrors;
            await this.props.createInvitation(this.state.invitationData);
        } catch (error) {
            // TODO: Handle error with logging
            alert(`Error encountered creating invitation: ${ error }`);
        }

        if(this.props.invitationCreationError === null) {
            this.setState({
                invitationCreatedSuccessfully: true
            });
        }
    };

    render() {
        const props = {
            handleChange: this.handleChange,
            handleSubmit: this.handleSubmit,
            invitationCreatedSuccesfully: this.state.invitationCreatedSuccesfully,
            ...this.state.invitationData,
            ...this.props
        };

        return <InvitationModalContent {...props} />;
    }
}

const mapStateToProps = state => ({
    currentHousehold: selectCurrentHousehold(state),
    user: selectUser(state),
    invitationCreationError: selectInvitationCreationError(state)
});

export default connect(mapStateToProps, {
    createInvitation,
    clearInvitationErrors
})(InvitationModal);