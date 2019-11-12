import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    acceptInvitation,
    deleteInvitation,
    clearInvitationErrors
} from '../../actions/invitationActions';
import {
    selectAcceptInvitationError,
    selectDeleteInvitationError
} from '../../reducers/selectors';

import StandardButton from '../Buttons/StandardButton';
import Heading from '../Typography/Heading';
import SubHeading from '../Typography/SubHeading';
import Paragraph from '../Typography/Paragraph';
import Quotation from '../Typography/Quotation';
import Divider from '../Decorative/Divider';

class ViewInvitationModal extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        let errors = null;

        return (
            <div className={ this.props.className }>
                <Heading
                    light={ false }
                    divider="colored"
                >
                    You've been invited!
                </Heading>
                <Paragraph
                    light={ false }
                >
                    You were invited to join { this.props.invitation.householdName }
                </Paragraph>
                { this.props.invitation.message
                    ? (
                        <React.Fragment>
                            <SubHeading
                                light={ false }
                            >
                                Message:
                            </SubHeading>
                            <Quotation
                                light={ false }
                            >
                                { this.props.invitation.message }
                            </Quotation>
                        </React.Fragment>
                    ) 
                    : null
                }
                <Divider
                    size="small"
                    color="colored"
                />
                <div className="modal__button-container">
                    <StandardButton
                        size="medium"
                        onClick={ () => this.props.acceptInvitation(this.props.invitation._id) }
                    >
                        Accept
                    </StandardButton>
                    <StandardButton
                        size="medium"
                        onClick={ () => this.props.deleteInvitation(this.props.invitation._id) }
                    >
                        Decline
                    </StandardButton>
                    <StandardButton
                        size="medium"
                        onClick={ this.props.toggleIsShown }
                    >
                        Close
                    </StandardButton>
                </div>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        acceptErrors: selectAcceptInvitationError(state),
        deleteErrors: selectDeleteInvitationError(state)
    };
};

export default connect(mapStateToProps, { 
    acceptInvitation,
    deleteInvitation,
    clearInvitationErrors
})(ViewInvitationModal);