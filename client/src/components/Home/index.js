import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    selectCurrentHousehold, 
    selectUser,
    selectInvitationCreationError
} from '../../reducers/selectors';
import { clearInvitationErrors } from '../../actions/invitationActions';

import InvitationModal from '../Modals/InvitationModal';
import HomeSettings from './HomeSettings';

import SectionHeader from '../Layout/SectionHeader';
import CircleButton from '../Buttons/CircleButton';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showInvitationModal: false || (props.invitationCreationError !== null)
        };

        this.toggleInvitationModal.bind(this);
    }

    toggleInvitationModal = () => {
        this.props.clearInvitationErrors();
        this.setState({
            showInvitationModal: (this.state.showInvitationModal) ? false : true
        });
    };

    render() {
        const invitationModal = (this.state.showInvitationModal)
            ? <InvitationModal toggleInvitationModal={ this.toggleInvitationModal } />
            : null;

        const canInvite = this.props.currentHousehold.settings.allMembersCanInvite || this.props.currentHousehold._ownerId === this.props.user._id;

        return (
            <section className="home">
                <SectionHeader title="Home">
                    <CircleButton
                        light={ true } 
                        onClick={ this.toggleInvitationModal }
                        disabled={ !canInvite }
                        tooltipText="Invite Member"
                    >
                        <i className="fas fa-user-plus"></i>
                    </CircleButton>
                    { invitationModal }
                </SectionHeader>
                <HomeSettings />
            </section>
        );
    }
};

const mapStateToProps = state => {
    return {
        currentHousehold: selectCurrentHousehold(state),
        user: selectUser(state),
        invitationCreationError: selectInvitationCreationError(state)
    };
};

export default connect(mapStateToProps, { clearInvitationErrors })(Home);