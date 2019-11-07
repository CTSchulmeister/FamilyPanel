import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    selectCurrentHousehold, 
    selectUser,
    selectInvitationCreationError
} from '../../reducers/selectors';
import { clearInvitationErrors } from '../../actions/invitationActions';

import InvitationModal from '../../containers/InvitationModal';
import HomeSettings from './HomeSettings';
import Modal from '../Modals';

import SectionHeader from '../Layout/SectionHeader';
import CircleButton from '../Buttons/CircleButton';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showInvitationModal: false || (props.invitationCreationError !== null)
        };
    }

    render() {
        const canInvite = this.props.currentHousehold.settings.allMembersCanInvite || this.props.currentHousehold._ownerId === this.props.user._id;

        return (
            <section className="home">
                <SectionHeader title="Home">
                    <Modal>
                        <CircleButton
                            light={ true }
                            disabled={ !canInvite }
                            tooltipText="Invite Member"
                        >
                            <i className="fas fa-user-plus"></i>
                        </CircleButton>
                        <InvitationModal />
                    </Modal>
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